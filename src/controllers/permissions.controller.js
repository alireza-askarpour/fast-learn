import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import { ObjectIdValidator } from '../validations/public.validation.js'
import {
  createPermissionSchema,
  updatePermissionSchema,
} from '../validations/RBAC.validation.js'

import PermissionModel from '../models/permission.models.js'
import { Messages } from '../constants/messages.js'

/**
 * Get all permissions
 */
export const getPermissions = async (req, res, next) => {
  try {
    const permissions = await PermissionModel.find()

    if (!permissions) {
      throw createHttpError.InternalServerError(Messages.FAILED_GET_PERMISSIONS)
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

/**
 * Create new permission
 */
export const createPermission = async (req, res, next) => {
  try {
    const { name, description } = await createPermissionSchema.validateAsync(req.body)

    const permission = await PermissionModel.findOne({ name })
    if (permission) throw createHttpError.BadRequest(Messages.ACCESS_ALREADY_EXISTED)

    const permissionResult = await PermissionModel.create({ name, description })
    if (!permissionResult)
      throw createHttpError.InternalServerError(Messages.FAILED_CREATE_PERMISSION)

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      success: true,
      message: Messages.CREATED_PERMISSION,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Update permission by ID
 */
export const updatePermission = async (req, res, next) => {
  const { id } = req.params
  try {
    const { _id } = await findPermissionByID(id)
    const permissionDataBody = await updatePermissionSchema.validateAsync(req.body)

    const updatePermissionResult = await PermissionModel.updateOne(
      { _id },
      { $set: permissionDataBody }
    )

    if (!updatePermissionResult.modifiedCount) {
      throw createHttpError.InternalServerError(Messages.FAILED_UPDATE_PERMISSION)
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: Messages.UPDATED_PERMISSION,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Remove permission by ID
 */
export const removePermission = async (req, res, next) => {
  const { id } = req.params
  try {
    const { _id } = await findPermissionByID(id)

    const removePermissionResult = await PermissionModel.deleteOne({ _id })

    if (!removePermissionResult.deletedCount) {
      throw createHttpError.InternalServerError(Messages.FAILED_DELETE_PERMISSION)
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: Messages.DELETED_PERMISSION,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * find permission by ID
 */
const findPermissionByID = async id => {
  const { id: permissionId } = await ObjectIdValidator.validateAsync({ id })

  const permission = await PermissionModel.findById(permissionId)
  if (!permission) throw createHttpError.NotFound(Messages.PERMISSION_NOT_FOUND)

  return permission
}
