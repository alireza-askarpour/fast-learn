import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import BlogModel from '../models/blog.models.js'
import { createBlogSchema } from '../validations/blog.validation.js'
import { nanoid, alphabetLetters, alphabetNumber } from '../config/nanoid.config.js'

export const createBlog = async (req, res, next) => {
  try {
    const { title, description, content, slug, tags, reading_time } = await createBlogSchema.validateAsync(req.body)

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
      reading_time,
      thumbnail,
      author,
      short_link: nanoid(alphabetLetters + alphabetNumber, 5),
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
