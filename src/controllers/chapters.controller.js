import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import CourseModel from '../models/course.models.js'

import { findCourseById } from './courses.controller.js'

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
