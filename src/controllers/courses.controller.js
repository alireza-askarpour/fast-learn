import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import CourseModel from '../models/course.models.js'
import { deleteFile } from '../utils/file-system.utils.js'
import { createCourseSchema, updateCourseSchema } from '../validations/course.validation.js'
import { ObjectIdValidator, SlugValidator } from '../validations/public.validation.js'

export const getCourses = async (req, res, next) => {
  const { search } = req.query
  try {
    let courses
    courses = await CourseModel.find(search ? { $text: { $search: search } } : {})
      .populate([
        { path: 'category', select: { children: 0, parent: 0 } },
        {
          path: 'teacher',
          select: { first_name: 1, last_name: 1, mobile: 1, email: 1 },
        },
      ])
      .sort({ _id: -1 })

    if (!courses) throw createHttpError.InternalServerError('The list of courses was not received')

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      courses,
    })
  } catch (err) {
    next(err)
  }
}

export const getCourse = async (req, res, next) => {
  const { slug } = req.params
  try {
    const course = await findCourseBySlug(slug)

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      course,
    })
  } catch (err) {
    next(err)
  }
}

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

    const newCourse = await CourseModel.create(course)
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

export const updateCourse = async (req, res, next) => {
  const { id } = req.params
  try {
    const course = await findCourseById(id)

    if (req?.body?.tags) {
      const tags = req.body.tags.split(',')
      req.body.tags = tags
    }

    const courseDataBody = await updateCourseSchema.validateAsync(req.body)

    if (req?.file) {
      const thumbnailPath = req?.file?.path?.replace(/\\/g, '/')
      courseDataBody.thumbnail = thumbnailPath
      deleteFile(course.thumbnail)
    }

    const updatedCourseResult = await CourseModel.updateOne({ _id: id }, { $set: courseDataBody })
    if (updatedCourseResult.modifiedCount == 0) throw createHttpError.InternalServerError('The course was not updated')

    res.status(StatusCodes.OK).json({
      success: true,
      status: StatusCodes.OK,
      message: 'The course has been updated',
    })
  } catch (err) {
    if (req?.file) {
      const thumbnailPath = req?.file?.path?.replace(/\\/g, '/')
      deleteFile(thumbnailPath)
    }
    next(err)
  }
}

export const findCourseById = async courseId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: courseId })
  const course = await CourseModel.findById(id)
  if (!course) throw createHttpError.NotFound('Not found course')
  return course
}

const findCourseBySlug = async slug => {
  await SlugValidator.validateAsync({ slug })
  const course = await CourseModel.findOne({ slug })
  if (!course) throw createHttpError.NotFound('Not found course')
  return course
}
