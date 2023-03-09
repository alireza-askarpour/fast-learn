import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import UserModel from '../models/user.models.js'

import { checkOtpSchema, getOtpSchema } from '../validations/user.validation.js'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/token-utils.js'
import { generateRandomNumber } from '../utils/generate-number.util.js'
import { ROLES } from '../constants/RBACK.constant.js'

export const getOtp = async (req, res, next) => {
  const { mobile } = req.body
  try {
    await getOtpSchema.validateAsync(req.body)
    const code = generateRandomNumber()

    const result = await saveUser(mobile, code)
    if (!result) throw createHttpError.Unauthorized('Login failed')

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      message: 'The validation code has been successfully sent to you',
      code,
      mobile,
    })
  } catch (err) {
    next(err)
  }
}

const saveUser = async (mobile, code) => {
  const otp = {
    code,
    expiresIn: new Date().getTime() + 120000,
  }
  const existUserResult = await checkExistUser(mobile)
  if (existUserResult) return await updateUser(mobile, { otp })

  return !!(await UserModel.create({
    mobile,
    otp,
    role: ROLES.STUDENT,
  }))
}

const checkExistUser = async mobile => {
  const user = await UserModel.findOne({ mobile })
  return !!user
}

const updateUser = async (mobile, objectData) => {
  const nullish = ['', ' ', 0, '0', null, undefined, NaN]
  Object.keys(objectData).map(key => {
    if (nullish.includes(objectData[key])) delete objectData[key]
  })
  const updateResult = await UserModel.updateOne({ mobile }, { $set: objectData })
  return !!updateResult.modifiedCount
}

export const checkOtp = async (req, res, next) => {
  const { mobile, code } = req.body
  try {
    await checkOtpSchema.validateAsync(req.body)

    const user = await UserModel.findOne({ mobile })
    if (!user) throw createHttpError.NotFound('Not found user')

    const now = Date.now()
    if (user.otp.code != code) throw createHttpError.Unauthorized('The code sent is not correct')
    if (+user.otp.expiresIn < now) throw createHttpError.Unauthorized('Your code has expired')

    const accessToken = await signAccessToken(user._id)
    const refreshToken = await signRefreshToken(user._id)

    res.status(StatusCodes.CREATED).json({
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
