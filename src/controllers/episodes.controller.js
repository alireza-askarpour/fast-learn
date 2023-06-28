import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'
import { getVideoDurationInSeconds } from 'get-video-duration'

import CourseModel from '../models/course.models.js'

import {
  createEpisodeSchema,
  updateEpisodeSchema,
} from '../validations/episode.validation.js'
import { ObjectIdValidator } from '../validations/public.validation.js'

import { getTimeOfEpisode } from '../utils/get-time.utils.js'
import { deleteFile } from '../utils/file-system.utils.js'

import { Messages } from '../constants/messages.js'

export const createEpisode = async (req, res, next) => {
  try {
    const { title, description, type, chapterId, courseId } =
      await createEpisodeSchema.validateAsync(req.body)

    const videoAddress = req?.file?.path?.replace(/\\/g, '/')
    const videoURL = `${process.env.BASE_URL}/${videoAddress}`
    const seconds = await getVideoDurationInSeconds(videoURL)
    const time = getTimeOfEpisode(seconds)

    const course = await CourseModel.findById(courseId)
    if (!course) throw createHttpError.NotFound(Messages.NOT_FOUND_COURSE_WITH_THIS_ID)

    const chapter = await CourseModel.findOne({
      _id: courseId,
      'chapters._id': chapterId,
    })
    if (!chapter) throw createHttpError.NotFound(Messages.NOT_FOUND_CHAPTER_WITH_THIS_ID)

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
      throw createHttpError.InternalServerError(Messages.FAILED_CREATED_EPISODE)
    }

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      success: true,
      episode,
      message: Messages.CREATED_EPISODE,
    })
  } catch (err) {
    next(err)
  }
}

export const updateEpisode = async (req, res, next) => {
  const { episodeId } = req.params
  try {
    const episode = await getOneEpisode(episodeId)
    const episodeDataBody = await updateEpisodeSchema.validateAsync(req.body)

    if (req?.file) {
      const videoAddress = req?.file?.path?.replace(/\\/g, '/')
      const videoURL = `${process.env.BASE_URL}/${videoAddress}`
      const seconds = await getVideoDurationInSeconds(videoURL)
      const time = getTimeOfEpisode(seconds)

      episodeDataBody.videoAddress = videoAddress
      episodeDataBody.time = time

      deleteFile(episode.videoAddress)
    }

    const editEpisodeResult = await CourseModel.updateOne(
      {
        'chapters.episodes._id': episodeId,
      },
      {
        $set: {
          'chapters.$.episodes': episodeDataBody,
        },
      }
    )

    if (!editEpisodeResult.modifiedCount) {
      throw createHttpError.InternalServerError(Messages.FAILED_UPDATED_EPISODE)
    }

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      success: true,
      message: Messages.UPDATED_EPISODE,
    })
  } catch (err) {
    next(err)
  }
}

export const removeEpisode = async (req, res, next) => {
  try {
    const { id: episodeId } = await ObjectIdValidator.validateAsync({
      id: req.params.episodeId,
    })
    const episode = await getOneEpisode(episodeId)

    const removeEpisodeResult = await CourseModel.updateOne(
      {
        'chapters.episodes._id': episodeId,
      },
      {
        $pull: {
          'chapters.$.episodes': {
            _id: episodeId,
          },
        },
      }
    )

    if (removeEpisodeResult.modifiedCount == 0) {
      throw createHttpError.InternalServerError(Messages.FAILED_DELETE_EPISODE)
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: Messages.DELETED_EPISODE,
    })
  } catch (err) {
    next(err)
  }
}

const getOneEpisode = async episodeId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: episodeId })

  const course = await CourseModel.findOne(
    { 'chapters.episodes._id': id },
    {
      'chapters.episodes.$': 1,
    }
  )
  if (!course) throw createHttpError.NotFound(Messages.NOT_FOUND_EPISODE)

  const episode = course?.chapters?.[0]?.episodes?.[0]
  if (!episode) throw createHttpError.NotFound(Messages.NOT_FOUND_EPISODE)

  return episode
}
