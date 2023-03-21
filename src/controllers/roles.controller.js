import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import RoleModel from '../models/role.models.js'
import { createRoleSchema } from '../validations/RBAC.validation.js'

/**
 * Get all roles
 */
export const getRoles = async (req, res, next) => {
  try {
    const roles = await RoleModel.find()

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

/**
 * Create new role
 */
export const createRole = async (req, res, next) => {
  try {
    const { name, description, permissions } = await createRoleSchema.validateAsync(req.body)

    const role = await RoleModel.findOne({ name })
    if (role) throw createHttpError.BadRequest('Role has already been existed')

    const roleResult = await RoleModel.create({ name, description, permissions })
    if (!roleResult) throw createHttpError.InternalServerError('Role was not granted')

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      success: true,
      message: 'Role was successfully established',
    })
  } catch (err) {
    next(err)
  }
}
