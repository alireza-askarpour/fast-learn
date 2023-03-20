import readingTime from 'reading-time'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import BlogModel from '../models/blog.models.js'

import { createBlogSchema, updateBlogSchema } from '../validations/blog.validation.js'
import { ObjectIdValidator } from '../validations/public.validation.js'

import { nanoid, alphabetLetters, alphabetNumber } from '../config/nanoid.config.js'
import { getOnlyText } from '../utils/get-only-text.utils.js'
import { deleteFile } from '../utils/file-system.utils.js'

export const createBlog = async (req, res, next) => {
  try {
    const { title, description, content, slug, tags } = await createBlogSchema.validateAsync(req.body)

    const thumbnail = req?.file?.path?.replace(/\\/g, '/')
    const author = req.user._id

    const existSlug = await BlogModel.findOne({ slug })
    if (existSlug) throw createHttpError.BadRequest('The slug entered already existed')

    const newBlog = {
      title,
      description,
      content,
      slug,
      tags,
      thumbnail,
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
    next(err)
  }
}

export const updateBlog = async (req, res, next) => {
  const { id } = req.params
  try {
    const blog = await findBlog(id)

    if (req?.body?.tags) {
      const tags = req.body.tags.split(',')
      req.body.tags = tags
    }

    const blogDataBody = await updateBlogSchema.validateAsync(req.body)

    if (req?.file) {
      const thumbnailPath = req?.file?.path?.replace(/\\/g, '/')
      blogDataBody.thumbnail = thumbnailPath
      deleteFile(blog.thumbnail)
    }

    const updateResult = await BlogModel.updateOne({ _id: id }, { $set: blogDataBody })
    if (updateResult.modifiedCount == 0) throw createError.InternalServerError('Update failed')

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: 'Blog has been successfully updated',
    })
  } catch (err) {
    next(err)
  }
}

const findBlog = async blogId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: blogId })
  const blog = await BlogModel.findById(id)
  if (!blog) throw createError.NotFound('No post found')
  return blog
}
