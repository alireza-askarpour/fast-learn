import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import PermissionModel from '../models/permission.models.js'

/**
 * Get all permissions
 */
export const getPermissions = async (req, res, next) => {
  try {
    const permissions = await PermissionModel.find()

    if (!permissions) {
      throw createHttpError.InternalServerError('Permission list not received')
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      permissions,
    })
  } catch (err) {
    next(err)
  }
}
