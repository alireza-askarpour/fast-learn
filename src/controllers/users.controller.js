import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import UserModel from '../models/user.models.js'
import { ObjectIdValidator } from '../validations/public.validation.js'
import { Messages } from '../constants/messages.js'

/**
 * Get all users
 */
export const getUsers = async (req, res, next) => {
  const { search } = req.query
  try {
    const users = await UserModel.find(search ? { $text: { $search: search } } : {})
    if (!users) throw createHttpError.InternalServerError(Messages.FAILED_GET_USERS)

    return res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      success: true,
      users,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Get a user by ID
 */
export const getUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const { id: userId } = await ObjectIdValidator.validateAsync({ id })

    const user = await UserModel.findById(userId)
    if (!user) throw createHttpError.InternalServerError(Messages.FAILED_GET_USER)

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
 * Remove a user by ID
 */
export const removeUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const { id: userId } = await ObjectIdValidator.validateAsync({ id })

    const removedUserResult = await UserModel.deleteOne({ _id: userId })
    if (removedUserResult.deletedCount == 0) {
      throw createHttpError.InternalServerError(Messages.FAILED_DELETE_USER)
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: Messages.DELETED_USER,
    })
  } catch (err) {
    next(err)
  }
}
