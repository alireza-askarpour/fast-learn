import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'
import { getVideoDurationInSeconds } from 'get-video-duration'

import CourseModel from '../models/course.models.js'

import { createEpisodeSchema, updateEpisodeSchema } from '../validations/episode.validation.js'
import { ObjectIdValidator } from '../validations/public.validation.js'

import { getTimeOfEpisode } from '../utils/get-time.utils.js'
import { deleteFile } from '../utils/file-system.utils.js'

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
      throw createHttpError.InternalServerError('Failed to add episode')
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
      throw createHttpError.InternalServerError('The episode could not be edited.')
    }

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      success: true,
      message: 'The episode was edited successfully',
    })
  } catch (err) {
    next(err)
  }
}

export const removeEpisode = async (req, res, next) => {
  try {
    const { id: episodeId } = await ObjectIdValidator.validateAsync({ id: req.params.episodeId })
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
      throw createHttpError.InternalServerError('Failed to delete episode')
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: 'The episode was successfully deleted',
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
  if (!course) throw createHttpError.NotFound('No episode found.')

  const episode = course?.chapters?.[0]?.episodes?.[0]
  if (!episode) throw createHttpError.NotFound('No episodes found')

  return episode
}