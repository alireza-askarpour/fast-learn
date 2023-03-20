import express from 'express'

import { createBlog } from '../controllers/blogs.controller.js'
import { stringToArray } from '../middlewares/string-to-array.middleware.js'
import { uploadCourseThumbnail } from '../middlewares/upload.middleware.js'

const router = express.Router()

router.post('/create', uploadCourseThumbnail.single('thumbnail'), stringToArray('tags'), createBlog)

export default router
