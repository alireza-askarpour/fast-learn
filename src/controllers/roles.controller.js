import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import RoleModels from '../models/role.models.js'

/**
 * Get all roles
 */
export const getRoles = async (req, res, next) => {
  try {
    const roles = await RoleModels.find()

    if (!roles) {
      throw createHttpError.InternalServerError('Roles list not received')
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      roles,
    })
  } catch (err) {
    next(err)
  }
}
