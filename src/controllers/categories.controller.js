import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import CategoryModel from '../models/category.model.js'
import { categorySchema } from '../validations/category.validation.js'

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find()

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      categories,
    })
  } catch (err) {
    next(err)
  }
}

export const createCategory = async (req, res, next) => {
  const { name, value } = req.body
  try {
    await categorySchema.validateAsync(req.body)

    const existCategory = await CategoryModel.findOne({ name })
    if (existCategory) throw createHttpError.BadRequest('Category already exists')

    const newCategory = await CategoryModel.create({ name, value })
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

export const updateCategory = async (req, res, next) => {
  const { id } = req.params
  const { name, value } = req.body
  try {
    await categorySchema.validateAsync(req.body)

    const existCategory = await CategoryModel.findOne({ $or: [{ name }, { value }] })
    if (existCategory) throw createHttpError.BadRequest('Category already exists')

    const category = { name, value }
    const updatedResult = await CategoryModel.findByIdAndUpdate(id, category)

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: 'Updated successfully',
    })
  } catch (err) {
    next(err)
  }
}

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    const existCategory = await CategoryModel.findById(id)
    if (!existCategory) throw createHttpError.NotFound('Category not found')

    const deleteCategory = await CategoryModel.deleteOne({ _id: id })
    if (!deleteCategory.deletedCount === 0) throw createHttpError.InternalServerError('The category was not deleted')

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: 'Category removed successfully',
    })
  } catch (err) {
    next(err)
  }
}
