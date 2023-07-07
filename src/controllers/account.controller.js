import bcrypt from 'bcryptjs'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import UserModel from '../models/user.models.js'
import SkillModel from '../models/skill.model.js'

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

import { loginSchema, signupSchema } from '../validations/user.validation.js'
import { createSkillSchema, updateSkillSchema } from '../validations/skill.validation.js'
import { ObjectIdValidator } from '../validations/public.validation.js'

import { Messages } from '../constants/messages.js'

/**
 * Login admin
 */
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = await loginSchema.validateAsync(req.body)

    const user = await UserModel.findOne({ email })
    if (!user) throw createHttpError.BadRequest(Messages.INCORRECT_EMAIL_OR_PASSWORD)

    const checkAdmin = await UserModel.findOne({ role: 'admin' })
    if (!checkAdmin)
      throw createHttpError.BadRequest(Messages.INCORRECT_EMAIL_OR_PASSWORD)

    const comparedPassword = bcrypt.compareSync(password, user.password)
    if (!comparedPassword)
      throw createHttpError.BadRequest(Messages.INCORRECT_EMAIL_OR_PASSWORD)

    const accessToken = await signAccessToken(email, user._id)
    const refreshToken = await signRefreshToken(email, user._id)

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
    if (!user) throw createHttpError.BadRequest(Messages.INCORRECT_EMAIL_OR_PASSWORD)

    const comparedPassword = bcrypt.compareSync(password, user.password)
    if (!comparedPassword)
      throw createHttpError.BadRequest(Messages.INCORRECT_EMAIL_OR_PASSWORD)

    const accessToken = await signAccessToken(email, user._id)
    const refreshToken = await signRefreshToken(email, user._id)

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
    if (existsUser) throw createHttpError.BadRequest(Messages.EMAIL_ALREADY_EXISTS)

    const hashedPassword = hashString(password)

    const createdResult = await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
    })
    if (!createdResult)
      throw createHttpError.InternalServerError(Messages.FAILED_CREATE_ACCOUNT)

    const accessToken = await signAccessToken(email, createdResult._id)
    const refreshToken = await signRefreshToken(email, createdResult._id)

    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      accessToken,
      refreshToken,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Refresh token
 */
export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body
  try {
    const { email, id } = await verifyRefreshToken(refreshToken)

    const accessToken = await signAccessToken(email, id)
    const newRefreshToken = await signRefreshToken(email, id)

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
    if (!req?.user) throw createHttpError.Unauthorized(Messages.USER_UNAUTHORIZED)

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
  if (userCourse) throw createHttpError.BadRequest(Messages.COURSE_ALREADY_PURCHASED)

  // Check the exist course in basket
  const existCourse = await UserModel.findOne({ _id: req.user._id, basket: courseId })
  if (existCourse) throw createHttpError.BadRequest(Messages.COURSE_ALREADY_EXIST)

  const addedToBasket = await UserModel.updateOne(
    { _id: req.user._id },
    { $push: { basket: courseId } }
  )
  if (!addedToBasket)
    throw createHttpError.InternalServerError(Messages.FAILED_ADD_TO_BASKET)

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: Messages.COURSE_ADDED_TO_BASKET,
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
  if (userCourse) throw createHttpError.BadRequest(Messages.COURSE_ALREADY_PURCHASED)

  const course = await findCourseInBasket(req.user._id, courseId)

  // Check the exist course in basket
  if (!course) throw createHttpError.NotFound(Messages.COURSE_NOT_FOUND_IN_BASKET)
  await UserModel.updateOne({ _id: req.user._id }, { $pull: { basket: courseId } })

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: Messages.COURSE_REMOVED_FROM_BASKET,
  })
})

// Find a course in basket by userID and courseID
export const findCourseInBasket = async (userID, courseID) => {
  const findResult = await UserModel.findOne(
    { _id: userID, basket: courseID },
    { basket: 1 }
  )
  const userDetails = copyObject(findResult)
  return userDetails?.basket?.[0]
}

/**
 * Upload Avatar
 */
export const uploadAvatar = async (req, res, next) => {
  try {
    const avatar = req?.file?.path?.replace(/\\/g, '/')
    const userId = req.user._id
    const user = await UserModel.findOne({ _id: userId })

    if (!req?.file) {
      throw createHttpError.BadRequest(Messages.INVALID_AVATAR)
    }

    // Delete old avatar
    if (user?.avatar) {
      deleteFile(user.avatar)
    }

    // Upload avatar
    const result = await UserModel.updateOne({ _id: user._id }, { $set: { avatar } })
    if (result.modifiedCount == 0) {
      throw createHttpError.InternalServerError(Messages.FAILED_UPLOAD_AVATAR)
    }

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      success: true,
      message: Messages.UPLOADED_AVATAR,
    })
  } catch (err) {
    if (req?.file) {
      const avatar = req?.file?.path?.replace(/\\/g, '/')
      deleteFile(avatar)
    }
    next(err)
  }
}

/**
 * Remove avatar
 */
export const removeAvatar = catchAsync(async (req, res) => {
  const userId = req.user._id
  const user = await UserModel.findById(userId)

  if (user?.avatar) {
    deleteFile(user.avatar)
  }

  const RemovedAvatar = await UserModel.updateOne(
    { _id: user._id },
    { $set: { avatar: null } }
  )
  if (RemovedAvatar.modifiedCount === 0) {
    throw createHttpError.InternalServerError(Messages.FAILED_REMOVE_AVATAR)
  }

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    success: true,
    message: Messages.REMOVED_AVATAR,
  })
})

/**
 * Upload cover
 */
export const uploadCover = async (req, res, next) => {
  try {
    const cover = req?.file?.path?.replace(/\\/g, '/')
    const userId = req.user._id
    const user = await UserModel.findOne({ _id: userId })
    if (!req?.file) {
      throw createHttpError.BadRequest(Messages.INVALID_COVER)
    }

    // Delete old cover
    if (user?.cover) {
      deleteFile(user.cover)
    }

    // Upload cover
    const result = await UserModel.updateOne({ _id: user._id }, { $set: { cover } })
    if (result.modifiedCount == 0) {
      throw createHttpError.InternalServerError(Messages.FAILED_UPLOAD_COVER)
    }

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      success: true,
      message: Messages.UPLOADED_COVER,
    })
  } catch (err) {
    if (req?.file) {
      const cover = req?.file?.path?.replace(/\\/g, '/')
      deleteFile(cover)
    }
    next(err)
  }
}

/**
 * Remove cover
 */
export const removeCover = catchAsync(async (req, res) => {
  const userId = req.user._id
  const user = await UserModel.findById(userId)

  if (user?.cover) {
    deleteFile(user.cover)
  }

  const RemovedCover = await UserModel.updateOne(
    { _id: user._id },
    { $set: { cover: null } }
  )
  if (RemovedCover.modifiedCount === 0) {
    throw createHttpError.InternalServerError(Messages.FAILED_REMOVE_COVER)
  }

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    success: true,
    message: Messages.REMOVED_COVER,
  })
})

/**
 * Create new skill
 */
export const createSkill = catchAsync(async (req, res) => {
  const { name, value } = await createSkillSchema.validateAsync(req.body)
  const userId = req.user._id

  const createdResult = await SkillModel.create({ name, value })
  if (!createdResult) {
    throw createHttpError.InternalServerError(Messages.FAILED_CREATE_SKILL)
  }

  const updateResult = await UserModel.updateOne(
    { _id: userId },
    { $push: { skills: createdResult._id } }
  )
  if (updateResult.modifiedCount == 0) {
    throw createHttpError.InternalServerError(Messages.FAILED_ADD_SKILL_IN_USER_ACCOUNT)
  }

  res.status(StatusCodes.CREATED).json({
    status: StatusCodes.CREATED,
    success: true,
    message: Messages.CREATED_SKILL,
  })
})

/**
 * Update a skill by ID
 */
export const updateSkill = catchAsync(async (req, res) => {
  const { id } = await ObjectIdValidator.validateAsync(req.params)
  const skillData = await updateSkillSchema.validateAsync(req.body)

  // Check exist skill into user skills
  const existSkill = await UserModel.findOne({ _id: req.user._id, skills: id })
  if (!existSkill) throw createHttpError.BadRequest(Messages.ENTERED_SKILL_IS_NOT_EXIST)

  // Update skill
  const updatedSkill = await SkillModel.findByIdAndUpdate(id, skillData)
  if (!updatedSkill)
    throw createHttpError.InternalServerError(Messages.FAILED_UPDATE_SKILL)

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: Messages.UPDATED_SKILL,
  })
})

/**
 * Remove skill by ID
 */
export const removeSkill = catchAsync(async (req, res) => {
  const { id } = await ObjectIdValidator.validateAsync(req.params)
  const userId = req.user._id

  // Check exist skill into user skills
  const existSkill = await UserModel.findOne({ _id: req.user._id, skills: id })
  console.log(existSkill)
  if (!existSkill) {
    throw createHttpError.BadRequest(Messages.NOT_EXIST_SKILL)
  }

  const updateResult = await UserModel.updateOne(
    { _id: userId },
    { $pull: { skills: id } }
  )
  if (updateResult.modifiedCount == 0) {
    throw createHttpError.InternalServerError(
      Messages.FAILED_REMOVE_SKILL_IN_USER_ACCOUNT
    )
  }

  const removedResult = await SkillModel.findByIdAndDelete(id)
  if (!removedResult) {
    throw createHttpError.InternalServerError(Messages.FAILED_REMOVE_SKILL)
  }

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: Messages.REMOVED_SKILL,
  })
})
