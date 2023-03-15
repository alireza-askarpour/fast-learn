import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'
import CourseModel from '../models/course.models.js'

import { deleteFile } from '../utils/file-system.utils.js'
import { createCourseSchema } from '../validations/course.validation.js'

export const createCourse = async (req, res, next) => {
  try {
    const courseDataBody = await createCourseSchema.validateAsync(req.body)
    const { type, price } = courseDataBody

    const thumbnailPath = req?.file?.path?.replace(/\\/g, '/')
    const teacher = req.user._id

    if (type === 'free' && +price > 0)
      throw createHttpError.BadRequest('No price can be registered for the free course')

    const course = {
      ...courseDataBody,
      teacher,
      thumbnail: thumbnailPath,
      status: 'soon',
      time: '00:00:00',
    }
console.log(course);
    const newCourse = await CourseModel.create({ course })
    if (!newCourse) throw createHttpError.InternalServerError('The course was not registered')

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      success: true,
      message: 'Course created successfully',
      course,
    })
  } catch (err) {
    const thumbnailPath = req?.file?.path?.replace(/\\/g, '/')
    deleteFile(thumbnailPath)
    next(err)
  }
}
