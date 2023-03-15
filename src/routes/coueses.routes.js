import express from 'express'

import { uploadCourseThumbnail } from '../middlewares/upload.middleware.js'
import { stringToArray } from '../middlewares/string-to-array.middleware.js'

import { createCourse } from '../controllers/courses.controller.js'

const router = express.Router()

router.post('/create', uploadCourseThumbnail.single('thumbnail'), stringToArray('tags'), createCourse)

export default router
