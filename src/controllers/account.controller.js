import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import UserModel from '../models/user.models.js'
import { loginSchema, signupSchema } from '../validations/user.validation.js'
import { hashString } from '../utils/hash-string.utils.js'
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/token-utils.js'
import { catchAsync } from '../utils/catch-async.js'
import { findCourseById } from './public.controller.js'
import { copyObject } from '../utils/copy-object.js'
import { deleteFile } from '../utils/file-system.utils.js'

/**
 * Login admin
 */
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = await loginSchema.validateAsync(req.body)

    const user = await UserModel.findOne({ email })
    if (!user) throw createHttpError.BadRequest('INCORRECT_EMAIL_PASSWORD')

    const checkAdmin = await UserModel.findOne({ role: 'admin' })
    if (!checkAdmin) throw createHttpError.BadRequest('INCORRECT_EMAIL_PASSWORD')

    const comparedPassword = bcrypt.compareSync(password, user.password)
    if (!comparedPassword) throw createHttpError.BadRequest('INCORRECT_EMAIL_PASSWORD')

    const accessToken = await signAccessToken(email)
    const refreshToken = await signRefreshToken(email)

    return res.status(StatusCodes.OK).json({
      success: true,
      status: StatusCodes.OK,
      accessToken,
      refreshToken,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Login user
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = await loginSchema.validateAsync(req.body)

    const user = await UserModel.findOne({ email })
    if (!user) throw createHttpError.BadRequest('INCORRECT_EMAIL_PASSWORD')

    const comparedPassword = bcrypt.compareSync(password, user.password)
    if (!comparedPassword) throw createHttpError.BadRequest('INCORRECT_EMAIL_PASSWORD')

    const accessToken = await signAccessToken(email)
    const refreshToken = await signRefreshToken(email)

    return res.status(StatusCodes.OK).json({
      success: true,
      status: StatusCodes.OK,
      accessToken,
      refreshToken,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Signup user
 */
export const signup = async (req, res, next) => {
  try {
    const { email, password, fullname } = await signupSchema.validateAsync(req.body)

    const existsUser = await UserModel.findOne({ email })
    if (existsUser) throw createHttpError.BadRequest('EMAIL_ALREADY_EXISTS')

    const hashedPassword = hashString(password)
    const accessToken = await signAccessToken(email)
    const refreshToken = await signRefreshToken(email)

    const createdResult = await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
    })
    if (!createdResult) throw createHttpError.InternalServerError('FAILED_CREATE_ACCOUNT')

    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      accessToken,
      refreshToken,
    })
  } catch (err) {
    next(err)
  }
}

export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body
  try {
    const email = await verifyRefreshToken(refreshToken)

    const accessToken = await signAccessToken(email)
    const newRefreshToken = await signRefreshToken(email)

    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      accessToken,
      refreshToken: newRefreshToken,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Get logged in user
 */
export const getMe = async (req, res, next) => {
  try {
    if (!req?.user) throw createHttpError.Unauthorized('User unauthorized')

    const userId = req.user._id
    const user = await UserModel.findById(userId, { password: 0, otp: 0 })

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      user,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Add course to basket
 */
export const addToBasket = catchAsync(async (req, res) => {
  const { courseId } = req.params

  await findCourseById(courseId)

  // Check the purchased course
  const userCourse = await UserModel.findOne({ _id: req.user._id, courses: courseId })
  if (userCourse) throw createHttpError.BadRequest('COURSE_ALREADY_PURCHASED')

  // Check the exist course in basket
  const existCourse = await UserModel.findOne({ _id: req.user._id, basket: courseId })
  if (existCourse) throw createHttpError.BadRequest('COURSE_ALREADY_EXIST')

  const addedToBasket = await UserModel.updateOne(
    { _id: req.user._id },
    { $push: { basket: courseId } }
  )
  if (!addedToBasket) throw createHttpError.InternalServerError('FAILED_ADD_TO_BASKET')

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: 'COURSE_ADDED_TO_BASKET',
  })
})

/**
 * Remove course from basket by courseId
 */
export const removeFromBasket = catchAsync(async (req, res) => {
  const { courseId } = req.params

  await findCourseById(courseId)

  // Check the purchased course
  const userCourse = await UserModel.findOne({ _id: req.user._id, courses: courseId })
  if (userCourse) throw createHttpError.BadRequest('COURSE_ALREADY_PURCHASED')

  const course = await findCourseInBasket(req.user._id, courseId)

  // Check the exist course in basket
  if (!course) throw createHttpError.NotFound('COURSE_NOT_FOUND_IN_BASKET')
  await UserModel.updateOne({ _id: req.user._id }, { $pull: { basket: courseId } })

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: 'COURSE_REMOVED_FROM_BASKET',
  })
})

export const uploadAvatar = async (req, res, next) => {
  try {
    const avatar = req?.file?.path?.replace(/\\/g, '/')
    const userId = req.user._id
    const user = await UserModel.findOne({ _id: userId })

    // Delete old avatar
    if (user?.avatar) {
      deleteFile(user.avatar)
    }

    // Upload cover
    const result = await UserModel.updateOne({ _id: user._id }, { $set: { avatar } })
    if (result.modifiedCount == 0) {
      throw createHttpError.InternalServerError('FAILED_UPLOAD_AVATAR')
    }

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      success: true,
      message: 'UPLOADED_AVATAR',
    })
  } catch (err) {
    if (req?.file) {
      const avatar = req?.file?.path?.replace(/\\/g, '/')
      deleteFile(avatar)
    }
    next(err)
  }
}

// Find a course in basket by userID and courseID
export const findCourseInBasket = async (userID, courseID) => {
  const findResult = await UserModel.findOne(
    { _id: userID, basket: courseID },
    { basket: 1 }
  )
  const userDetails = copyObject(findResult)
  return userDetails?.basket?.[0]
}
