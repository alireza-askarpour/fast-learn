import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'
import { getVideoDurationInSeconds } from 'get-video-duration'

import CourseModel from '../models/course.models.js'

import { getTimeOfEpisode } from '../utils/get-time.utils.js'
import { createEpisodeSchema } from '../validations/episode.validation.js'

export const createEpisode = async (req, res, next) => {
  try {
    const { title, description, type, chapterId, courseId } = await createEpisodeSchema.validateAsync(req.body)

    const videoAddress = req?.file?.path?.replace(/\\/g, '/')
    const videoURL = `${process.env.BASE_URL}/${videoAddress}`
    const seconds = await getVideoDurationInSeconds(videoURL)
    const time = getTimeOfEpisode(seconds)

    const course = await CourseModel.findById(courseId)
    if (!course) throw createHttpError.NotFound('No course was found with this ID')

    const chapter = await CourseModel.findOne({ _id: courseId, 'chapters._id': chapterId })
    if (!chapter) throw createHttpError.NotFound('No chapter was found with this ID')

    const episode = {
      title,
      description,
      type,
      chapterId,
      courseId,
      time,
    }

    const createEpisodeResult = await CourseModel.updateOne(
      {
        _id: courseId,
        'chapters._id': chapterId,
      },
      {
        $push: {
          'chapters.$.episodes': episode,
        },
      }
    )

    if (createEpisodeResult.modifiedCount == 0) {
      throw createHttpError.InternalServerError('افزودن اپیزود انجام نشد')
    }

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      success: true,
      episode,
      message: 'Episode added successfully',
    })
  } catch (err) {
    next(err)
  }
}
