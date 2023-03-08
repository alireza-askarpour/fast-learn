import createHttpError from 'http-errors'

import UserModel from '../models/user.models.js'
import { ROLES } from '../constants/RBACK.js'
import { generateRandomNumber } from '../utils/generate-number.util.js'
import { getOtpSchema } from '../validations/user.validation.js'
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes.js'

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
  const existUserResult = checkExistUser(mobile)
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
