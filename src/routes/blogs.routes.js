import express from 'express'

import { createBlog, removeBlog, updateBlog } from '../controllers/blogs.controller.js'
import { stringToArray } from '../middlewares/string-to-array.middleware.js'
import { uploadCourseThumbnail } from '../middlewares/upload.middleware.js'

const router = express.Router()

router.post('/create', uploadCourseThumbnail.single('thumbnail'), stringToArray('tags'), createBlog)
router.patch('/update/:id', uploadCourseThumbnail.single('thumbnail'), updateBlog)
router.delete('/remove/:id', removeBlog)

export default router
