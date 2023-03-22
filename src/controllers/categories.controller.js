import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import CategoryModel from '../models/category.model.js'
import { createCategorySchema, updateCategorySchema } from '../validations/category.validation.js'
import { ObjectIdValidator } from '../validations/public.validation.js'

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
    const { name, value, disabled, parent } = await createCategorySchema.validateAsync(req.body)

    const existCategory = await CategoryModel.findOne({ name })
    if (existCategory) throw createHttpError.BadRequest('Category already exists')

    const newCategory = await CategoryModel.create({ name, value, disabled, parent })
    if (!newCategory) throw createHttpError.InternalServerError('Category not created')

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      success: true,
      message: 'The category was created successfully',
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
    if (existCategory) throw createHttpError.BadRequest('Category already exists')

    const updatedResult = await CategoryModel.updateOne({ _id }, { $set: categoryDataBody })
    if (updatedResult.modifiedCount == 0) {
      throw createHttpError.InternalServerError('Update failed')
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: 'Updated successfully',
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
      throw createHttpError.InternalServerError('The category was not deleted')
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: 'Category removed successfully',
    })
  } catch (err) {
    next(err)
  }
}

const checkExistCategory = async categoryId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: categoryId })
  const category = await CategoryModel.findById(id)
  if (!category) throw createHttpError.NotFound('Category not found')
  return category
}
