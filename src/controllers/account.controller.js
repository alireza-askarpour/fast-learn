import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import UserModel from '../models/user.models.js'
import { authSchema } from '../validations/user.validation.js'
import { hashString } from '../utils/hash-string.utils.js'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/token-utils.js'

export const login = async (req, res, next) => {
  try {
    const { email, password } = await authSchema.validateAsync(req.body)

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

export const signup = async (req, res, next) => {
  try {
    const { email, password } = await authSchema.validateAsync(req.body)

    const existsUser = await UserModel.findOne({ email })
    if (existsUser) throw createHttpError.BadRequest('EMAIL_ALREADY_EXISTS')

    const hashedPassword = hashString(password)
    const accessToken = await signAccessToken(email)
    const refreshToken = await signRefreshToken(email)

    const createdResult = await UserModel.create({ email, password: hashedPassword })
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
    const mobile = await verifyRefreshToken(refreshToken)
    const user = await UserModel.findOne({ mobile })

    const accessToken = await signAccessToken(user._id)
    const newRefreshToken = await signRefreshToken(user._id)

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
