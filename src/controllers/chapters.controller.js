import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import CourseModel from '../models/course.models.js'

import { findCourseById } from './courses.controller.js'
import { ObjectIdValidator } from '../validations/public.validation.js'
import { ChapterSchema } from '../validations/chapter.validation.js'

export const createChapter = async (req, res, next) => {
  const { id, title, description } = req.body
  try {
    console.log(id, title, description)
    await findCourseById(id)
    const chapters = { title, description, episodes: [] }

    const createChapterResult = await CourseModel.updateOne(
      { _id: id },
      {
        $push: {
          chapters: { title, description, episodes: [] },
        },
      }
    )
    if (createChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError('The chapter was not added')

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      success: true,
      message: 'Chapter created successfully',
    })
  } catch (err) {
    next(err)
  }
}

export const getChapters = async (req, res, next) => {
  const { courseId } = req.params
  try {
    const { id } = await ObjectIdValidator.validateAsync({ id: courseId })

    const course = await CourseModel.findOne({ _id: id }, { chapters: 1, title: 1 })
    if (!course) throw createHttpError.NotFound('No course found with this ID')

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      course,
    })
  } catch (err) {
    next(err)
  }
}

export const updateChapter = async (req, res, next) => {
  const { chapterId } = req.params
  try {
    const { id } = await ObjectIdValidator.validateAsync({ id: chapterId })
    const chapterDataBody = ChapterSchema.validateAsync(req.body)

    const chapter = await CourseModel.findOne({ 'chapters._id': id }, { 'chapters.$': 1 })
    if (!chapter) throw createHttpError.NotFound('No course found with this ID')

    const updateChapterResult = await CourseModel.updateOne(
      { 'chapters._id': chapterId },
      { $set: { 'chapters.$': chapterDataBody } }
    )

    if (updateChapterResult.modifiedCount == 0) {
      throw createHttpError.InternalServerError('The chapter could not be updated.')
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: 'The update was successful.',
    })
  } catch (err) {
    next(err)
  }
}

export const removeChapter = async (req, res, next) => {
  const { chapterId } = req.params
  try {
    await getOneChapter(chapterId)

    const removeChapterResult = await CourseModel.updateOne(
      { 'chapters._id': chapterId },
      {
        $pull: {
          chapters: {
            _id: chapterId,
          },
        },
      }
    )

    if (removeChapterResult.modifiedCount == 0) {
      throw createHttpError.InternalServerError('حذف فصل انجام نشد')
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: 'حذف فصل با موفقیت انجام شد',
    })
  } catch (err) {
    next(err)
  }
}

const getOneChapter = async chapterId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: chapterId })
  const chapter = await CourseModel.findOne({ 'chapters._id': id }, { 'chapters.$': 1 })
  if (!chapter) throw new createHttpError.NotFound('No chapter found with this ID.')
  return chapter
}
