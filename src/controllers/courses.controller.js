import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import CourseModel from '../models/course.models.js'
import CategoryModel from '../models/category.model.js'

import { deleteFile } from '../utils/file-system.utils.js'
import { createCourseSchema, updateCourseSchema } from '../validations/course.validation.js'
import { ObjectIdValidator, SlugValidator } from '../validations/public.validation.js'
import { catchAsync } from '../utils/catch-async.js'

export const getCourses = async (req, res, next) => {
  const { search } = req.query
  try {
    let courses
    courses = await CourseModel.find(search ? { $text: { $search: search } } : {})
      .populate([
        { path: 'category', select: ['_id', 'value', 'name'] },
        { path: 'teacher', select: ['first_name', 'last_name', 'email'] },
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
    if (!req?.body?.tags) req.body.tags = []
    const courseDataBody = await createCourseSchema.validateAsync(req.body)
    const { type, price, discount, slug, category } = courseDataBody

    const thumbnailPath = req?.file?.path?.replace(/\\/g, '/')
    const teacher = req.user._id

    if (type === 'free' && (+price > 0 || +discount > 0)) {
      throw createHttpError.BadRequest('No price or discount can be registered for the free course')
    }

    const existSlug = await CourseModel.findOne({ slug })
    if (existSlug) throw createHttpError.BadRequest('The slug entered already existed')

    await checkExistsCategory(category)

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
    })
  } catch (err) {
    if (req?.file) {
      const thumbnailPath = req?.file?.path?.replace(/\\/g, '/')
      deleteFile(thumbnailPath)
    }
    next(err)
  }
}

export const updateCourse = async (req, res, next) => {
  const { id } = req.params
  try {
    const course = await findCourseById(id)

    if (!req?.body?.tags) req.body.tags = []
    const courseDataBody = await updateCourseSchema.validateAsync(req.body)
    const { type, price, discount, slug, category } = courseDataBody

    if (type === 'free' && (+price > 0 || +discount > 0)) {
      throw createHttpError.BadRequest('No price or discount can be registered for the free course')
    }

    const existSlug = await CourseModel.findOne({ slug })
    if (existSlug) throw createHttpError.BadRequest('The slug entered already existed')

    await checkExistsCategory(category)

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

export const likeCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  await findCourseById(id)

  const likedCourse = await CourseModel.findOne({ _id: id, likes: req.user._id })
  const likeQuery = likedCourse ? { $pull: { likes: req.user._id } } : { $push: { likes: req.user._id } }
  await CourseModel.updateOne(likeQuery)
  const message = likedCourse ? 'UNLIKE' : 'LIKE'

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message,
  })
})

export const findCourseById = async courseId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: courseId })
  const course = await CourseModel.findById(id)
  if (!course) throw createHttpError.NotFound('Not found course')
  return course
}

const findCourseBySlug = async slug => {
  await SlugValidator.validateAsync({ slug })
  const course = await CourseModel.findOne({ slug }).populate([
    { path: 'category', select: ['_id', 'value', 'name'] },
    { path: 'teacher', select: ['first_name', 'last_name', 'email'] },
  ])
  if (!course) throw createHttpError.NotFound('Not found course')
  delete course.category.subcategories
  return course
}

const checkExistsCategory = async categoryId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: categoryId })
  const category = await CategoryModel.findById(id)
  if (!category) throw createHttpError.NotFound('CATEGORY_NOT_EXISRS')
  return category
}
