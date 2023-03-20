import express from 'express'

import { createBlog, getBlog, removeBlog, updateBlog } from '../controllers/blogs.controller.js'
import { stringToArray } from '../middlewares/string-to-array.middleware.js'
import { uploadCourseThumbnail } from '../middlewares/upload.middleware.js'

const router = express.Router()

router.get('/:slug', getBlog)
router.post('/create', uploadCourseThumbnail.single('thumbnail'), stringToArray('tags'), createBlog)
router.patch('/update/:id', uploadCourseThumbnail.single('thumbnail'), updateBlog)
router.delete('/remove/:id', removeBlog)

export default router
