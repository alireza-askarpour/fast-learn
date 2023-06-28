import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import CourseModel from '../models/course.models.js'

import { findCourseById } from './public.controller.js'
import { ObjectIdValidator } from '../validations/public.validation.js'
import { ChapterSchema } from '../validations/chapter.validation.js'
import { Messages } from '../constants/messages.js'

export const createChapter = async (req, res, next) => {
  const { id, title, description } = req.body
  try {
    await findCourseById(id)

    const createChapterResult = await CourseModel.updateOne(
      { _id: id },
      {
        $push: {
          chapters: { title, description, episodes: [] },
        },
      }
    )
    if (createChapterResult.modifiedCount == 0)
      throw createHttpError.InternalServerError(Messages.FAILED_CREATE_CHAPTER)

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      success: true,
      message: Messages.CREATED_CHAPTER,
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
    if (!course) throw createHttpError.NotFound(Messages.NOT_FOUND_CHAPTER_WITH_THIS_ID)

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
    if (!chapter) throw createHttpError.NotFound(Messages.NOT_FOUND_COURSE_WITH_THIS_ID)

    const updateChapterResult = await CourseModel.updateOne(
      { 'chapters._id': chapterId },
      { $set: { 'chapters.$': chapterDataBody } }
    )

    if (updateChapterResult.modifiedCount == 0) {
      throw createHttpError.InternalServerError(Messages.FAILED_UPDATE_CHAPTER)
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: Messages.UPDATED_CHAPTER,
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
      throw createHttpError.InternalServerError(Messages.FAILED_DELETE_CHAPTER)
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: Messages.DELETED_CHAPTER,
    })
  } catch (err) {
    next(err)
  }
}

const getOneChapter = async chapterId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: chapterId })
  const chapter = await CourseModel.findOne({ 'chapters._id': id }, { 'chapters.$': 1 })
  if (!chapter)
    throw new createHttpError.NotFound(Messages.NOT_FOUND_CHAPTER_WITH_THIS_ID)
  return chapter
}
