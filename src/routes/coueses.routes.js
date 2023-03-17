import express from 'express'

import { uploadCourseThumbnail } from '../middlewares/upload.middleware.js'
import { stringToArray } from '../middlewares/string-to-array.middleware.js'

import { createCourse, updateCourse } from '../controllers/courses.controller.js'

const router = express.Router()

router.post('/create', uploadCourseThumbnail.single('thumbnail'), stringToArray('tags'), createCourse)
router.patch('/update/:id', uploadCourseThumbnail.single('thumbnail'), updateCourse)

export default router
