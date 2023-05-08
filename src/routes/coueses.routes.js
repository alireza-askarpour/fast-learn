import express from 'express'

import { uploadCourseThumbnail } from '../middlewares/upload.middleware.js'
import { stringToArray } from '../middlewares/string-to-array.middleware.js'

import { getCourses, getCourse, createCourse, updateCourse } from '../controllers/courses.controller.js'

const router = express.Router()

router.get('/', getCourses)
router.get('/:slug', getCourse)
router.post('/', uploadCourseThumbnail.single('thumbnail'), stringToArray('tags'), createCourse)
router.patch('/:id', uploadCourseThumbnail.single('thumbnail'), stringToArray('tags'), updateCourse)

export default router
