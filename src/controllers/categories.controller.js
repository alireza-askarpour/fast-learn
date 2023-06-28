import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import CategoryModel from '../models/category.model.js'
import {
  createCategorySchema,
  updateCategorySchema,
} from '../validations/category.validation.js'
import { ObjectIdValidator } from '../validations/public.validation.js'

import { Messages } from '../constants/messages.js'

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find({ parent: undefined })

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      categories,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Create new category
 */
export const createCategory = async (req, res, next) => {
  try {
    const { name, value, disabled, parent } = await createCategorySchema.validateAsync(
      req.body
    )

    const existCategory = await CategoryModel.findOne({ name })
    if (existCategory) throw createHttpError.BadRequest(Messages.CATEGORY_ALREADY_EXISTS)

    const newCategory = await CategoryModel.create({ name, value, disabled, parent })
    if (!newCategory)
      throw createHttpError.InternalServerError(Messages.FAILED_CREATE_CATEGORY)

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      success: true,
      message: Messages.CREATED_CATEGORY,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Update category by ID
 */
export const updateCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    const { _id } = await checkExistCategory(id)

    const categoryDataBody = await updateCategorySchema.validateAsync(req.body)
    const { name, value } = categoryDataBody

    const existCategory = await CategoryModel.findOne({
      $or: [{ name }, { value }],
    })
    if (existCategory) throw createHttpError.BadRequest(Messages.CATEGORY_ALREADY_EXISTS)

    const updatedResult = await CategoryModel.updateOne(
      { _id },
      { $set: categoryDataBody }
    )
    if (updatedResult.modifiedCount == 0) {
      throw createHttpError.InternalServerError(Messages.FAILED_UPDATED_CATEGORY)
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: Messages.UPDATED_CATEGORY,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Remove category by ID
 */
export const removeCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    const { _id } = await checkExistCategory(id)

    const deletedCategory = await CategoryModel.deleteOne({ _id })
    if (!deletedCategory.deletedCount === 0) {
      throw createHttpError.InternalServerError(Messages.FAILED_DELETE_CATEGOR)
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: Messages.DELETED_CATEGORY,
    })
  } catch (err) {
    next(err)
  }
}

const checkExistCategory = async categoryId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: categoryId })
  const category = await CategoryModel.findById(id)
  if (!category) throw createHttpError.NotFound(Messages.CATEGORY_NOT_FOUND)
  return category
}
