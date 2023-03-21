import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import UserModel from '../models/user.models.js'

/**
 * Get all users
 */
export const getUsers = async (req, res, next) => {
  const { search } = req.query
  try {
    const users = await UserModel.find(search ? { $text: { $search: search } } : {})
    if (!users) throw createHttpError.InternalServerError('The list of users was not received')

    return res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      success: true,
      users,
    })
  } catch (err) {
    next(err)
  }
}
