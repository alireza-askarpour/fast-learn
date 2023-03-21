import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'

import RoleModel from '../models/role.models.js'
import { createRoleSchema, updateRoleSchema } from '../validations/RBAC.validation.js'

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
    const { title, description, permissions } = await createRoleSchema.validateAsync(req.body)

    const role = await RoleModel.findOne({ title })
    if (role) throw createHttpError.BadRequest('Role has already been existed')

    const roleResult = await RoleModel.create({ title, description, permissions })
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

/**
 * Update role by ID
 */
export const updateRole = async (req, res, next) => {
  const { id } = req.params
  try {
    const { _id } = await findRoleWithIdOrTitle(id)

    if (req?.body?.permissions) {
      const permissions = req.body.permissions.split(',')
      req.body.permissions = permissions
    }

    const roleDataBody = await updateRoleSchema.validateAsync(req.body)

    const updateRoleResult = await RoleModel.updateOne({ _id }, { $set: roleDataBody })

    if (!updateRoleResult.modifiedCount) {
      throw createHttpError.InternalServerError('The role was not edited')
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: 'Role was successfully updated',
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Find role with Id or title
 */
const findRoleWithIdOrTitle = async field => {
  const findQuery = mongoose.isValidObjectId(field) ? { _id: field } : { title: field }
  const role = await RoleModel.findOne(findQuery)
  if (!role) throw createHttpError.NotFound('The desired role was not found')
  return role
}
