import express from 'express'

import {
  getAllCategories,
  createCategory,
  updateCategory,
  removeCategory,
} from '../controllers/categories.controller.js'

const router = express.Router()

router.get('/', getAllCategories)
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', removeCategory)

export default router
