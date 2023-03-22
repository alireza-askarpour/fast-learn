import express from 'express'

import {
  getAllCategories,
  createCategory,
  updateCategory,
  removeCategory,
} from '../controllers/categories.controller.js'

const router = express.Router()

router.get('/list', getAllCategories)
router.post('/create', createCategory)
router.put('/update/:id', updateCategory)
router.delete('/remove/:id', removeCategory)

export default router
