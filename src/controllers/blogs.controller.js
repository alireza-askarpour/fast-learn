import readingTime from 'reading-time'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import BlogModel from '../models/blog.models.js'
import CategoryModel from '../models/category.model.js'
import CommentModel from '../models/comment.model.js'

import { createBlogSchema, updateBlogSchema } from '../validations/blog.validation.js'
import { ObjectIdValidator, SlugValidator } from '../validations/public.validation.js'
import { addPostCommentValidation } from '../validations/comment.validation.js'

import { nanoid, alphabetLetters, alphabetNumber } from '../config/nanoid.config.js'
import { getOnlyText } from '../utils/get-only-text.utils.js'
import { deleteFile } from '../utils/file-system.utils.js'
import { catchAsync } from '../utils/catch-async.js'

import { Messages } from '../constants/messages.js'

export const createBlog = async (req, res, next) => {
  try {
    if (!req?.body?.tags) req.body.tags = []
    const { title, description, content, slug, tags, category } =
      await createBlogSchema.validateAsync(req.body)

    const thumbnail = req?.file?.path?.replace(/\\/g, '/')
    const author = req.user._id

    const existSlug = await BlogModel.findOne({ slug })
    if (existSlug) throw createHttpError.BadRequest(Messages.SLUG_ALREADY_EXISTED)

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
    if (!blog) throw createHttpError.InternalServerError(Messages.FAILED_CREATE_BLOG)

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      success: true,
      message: Messages.CREATED_BLOG,
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
    if (updateResult.modifiedCount == 0)
      throw createHttpError.InternalServerError(Messages.FAILED_UPDATE_BLOG)

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: Messages.UPDATED_BLOG,
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
    if (result.deletedCount == 0)
      throw createHttpError.InternalServerError(Messages.FAILED_DELETE_BLOG)

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      success: true,
      message: Messages.DELETED_BLOG,
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
      throw createHttpError.InternalServerError(Messages.FAILED_GET_BLOGS)
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

export const likeBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params
  await findBlogById(id)

  const likedBlog = await BlogModel.findOne({ _id: id, likes: req.user._id })
  const updateQuery = likedBlog
    ? { $pull: { likes: req.user._id } }
    : { $push: { likes: req.user._id } }
  await BlogModel.updateOne({ _id: id }, updateQuery)
  const message = likedBlog ? Messages.UNLIKE_BLOG : Messages.LIKE_BLOG

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message,
  })
})

export const bookmarkBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  await findBlogById(id)

  const bookmarkedBlog = await BlogModel.findOne({ _id: id, bookmarks: req.user._id })
  const updateQuery = bookmarkedBlog
    ? { $pull: { bookmarks: req.user._id } }
    : { $push: { bookmarks: req.user._id } }
  await BlogModel.updateOne({ _id: id }, updateQuery)
  const message = bookmarkedBlog
    ? Messages.REMOVE_FROM_BOOKMARK
    : Messages.ADDED_TO_BOOKMARK

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message,
  })
})

/**
 * Get list comments
 */
export const getPostComments = catchAsync(async (req, res) => {
  const post = await findBlogById(req.params.id)

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    comments: post.comments,
  })
})

/**
 * Add comment or replay comment
 */
export const addPostComment = catchAsync(async (req, res) => {
  // check exist blog
  await findBlogById(req.params.id)

  const { blog, type, content, reply } = await addPostCommentValidation.validateAsync(
    req.body
  )
  const user = req.user._id

  if (type !== 'blog') throw createHttpError.BadRequest('')

  if (reply) {
    const parentComment = await CommentModel.findOne({ reply })
    if (!parentComment) throw createHttpError.NotFound(Messages.COMMENT_NOT_FOUND)
    if (parentComment.openToComment) {
      throw createHttpError.BadRequest(Messages.ANSWER_REGISTRATION_IS_NOT_ALLOWED)
    }
    await CommentModel.create({
      user,
      blog,
      type,
      content,
      reply,
    })
  } else {
    const createdResult = await CommentModel.create({
      user,
      blog,
      type,
      content,
    })
    if (!createdResult) {
      throw createHttpError.InternalServerError(Messages.FAILED_ADD_COMMENT)
    }
  }

  res.status(StatusCodes.CREATED).json({
    status: StatusCodes.CREATED,
    success: true,
    comments: post.comments,
  })
})

const findBlogById = async blogId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: blogId })
  const blog = await BlogModel.findById(id).populate('comments')
  if (!blog) throw createHttpError.NotFound(Messages.NOT_FOUND_BLOG)
  return blog
}

const findBlogBySlug = async blogSlug => {
  const { slug } = await SlugValidator.validateAsync({ slug: blogSlug })
  const blog = await BlogModel.findOne({ slug }).populate([
    { path: 'category', select: ['_id', 'value', 'name'] },
    { path: 'author', select: ['first_name', 'last_name', 'email'] },
  ])
  if (!blog) throw createHttpError.NotFound(Messages.NOT_FOUND_BLOG)
  delete blog.category.subcategories
  return blog
}

const checkExistsCategory = async categoryId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: categoryId })
  const category = await CategoryModel.findById(id)
  if (!category) throw createHttpError.NotFound(Messages.CATEGORY_NOT_EXISRS)
  return category
}
