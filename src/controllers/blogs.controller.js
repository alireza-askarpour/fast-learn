import readingTime from 'reading-time'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import BlogModel from '../models/blog.models.js'
import CategoryModel from '../models/category.model.js'

import { createBlogSchema, updateBlogSchema } from '../validations/blog.validation.js'
import { ObjectIdValidator, SlugValidator } from '../validations/public.validation.js'

import { nanoid, alphabetLetters, alphabetNumber } from '../config/nanoid.config.js'
import { getOnlyText } from '../utils/get-only-text.utils.js'
import { deleteFile } from '../utils/file-system.utils.js'

export const createBlog = async (req, res, next) => {
  try {
    if (!req?.body?.tags) req.body.tags = []
    const { title, description, content, slug, tags, category } = await createBlogSchema.validateAsync(req.body)

    const thumbnail = req?.file?.path?.replace(/\\/g, '/')
    const author = req.user._id

    const existSlug = await BlogModel.findOne({ slug })
    if (existSlug) throw createHttpError.BadRequest('The slug entered already existed')

    await checkExistsCategory(category)

    const newBlog = {
      title,
      description,
      content,
      slug,
      tags,
      thumbnail,
      category,
      author,
      short_link: nanoid(alphabetLetters + alphabetNumber, 5),
      reading_time: readingTime(getOnlyText(content)),
    }

    const blog = await BlogModel.create(newBlog)
    if (!blog) throw createHttpError.InternalServerError('Blog could not be created')

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      success: true,
      message: 'Blog has been successfully created',
    })
  } catch (err) {
    if (req?.file) {
      const thumbnailPath = req?.file?.path?.replace(/\\/g, '/')
      deleteFile(thumbnailPath)
    }
    next(err)
  }
}

export const updateBlog = async (req, res, next) => {
  const { id } = req.params
  try {
    const blog = await findBlogById(id)

    if (!req?.body?.tags) req.body.tags = []
    const blogDataBody = await updateBlogSchema.validateAsync(req.body)

    if (req?.file) {
      const thumbnailPath = req?.file?.path?.replace(/\\/g, '/')
      blogDataBody.thumbnail = thumbnailPath
      deleteFile(blog.thumbnail)
    }

    await checkExistsCategory(blogDataBody.category)

    const updateResult = await BlogModel.updateOne({ _id: id }, { $set: blogDataBody })
    if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError('Update failed')

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: 'Blog has been successfully updated',
    })
  } catch (err) {
    if (req?.file) {
      const thumbnailPath = req?.file?.path?.replace(/\\/g, '/')
      deleteFile(thumbnailPath)
    }
    next(err)
  }
}

export const removeBlog = async (req, res, next) => {
  const { id } = req.params
  try {
    await findBlogById(id)

    const result = await BlogModel.deleteOne({ _id: id })
    if (result.deletedCount == 0) throw createHttpError.InternalServerError('Delete failed')

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      success: true,
      message: 'The blog was successfully deleted',
    })
  } catch (err) {
    next(err)
  }
}

export const getBlog = async (req, res, next) => {
  const { slug } = req.params
  try {
    const blog = await findBlogBySlug(slug)

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      blog,
    })
  } catch (err) {
    next(err)
  }
}

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await BlogModel.aggregate([
      {
        $lookup: {
          from: 'users',
          foreignField: '_id',
          localField: 'author',
          as: 'author',
        },
      },
      {
        $unwind: '$author',
      },
      {
        $lookup: {
          from: 'categories',
          foreignField: '_id',
          localField: 'category',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $project: {
          'author.__v': 0,
          'category.__v': 0,
          'author.otp': 0,
          'author.role': 0,
        },
      },
    ])

    if (!blogs) {
      throw createHttpError.InternalServerError('The list of blogs was not received')
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      blogs,
    })
  } catch (err) {
    next(err)
  }
}

const findBlogById = async blogId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: blogId })
  const blog = await BlogModel.findById(id)
  if (!blog) throw createHttpError.NotFound('Not found blog')
  return blog
}

const findBlogBySlug = async blogSlug => {
  const { slug } = await SlugValidator.validateAsync({ slug: blogSlug })
  const blog = await BlogModel.findOne({ slug }).populate([
    { path: 'category', select: ['_id', 'value', 'name'] },
    { path: 'author', select: ['mobile', 'first_name', 'last_name', 'username'] },
  ])
  if (!blog) throw createHttpError.NotFound('Not found blog')
  console.log(blog)
  delete blog.category.subcategories
  return blog
}

const checkExistsCategory = async categoryId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: categoryId })
  const category = await CategoryModel.findById(id)
  if (!category) throw createHttpError.NotFound('CATEGORY_NOT_EXISRS')
  return category
}
