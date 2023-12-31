import express from 'express'

import { uploadCourseThumbnail } from '../middlewares/upload.middleware.js'
import { stringToArray } from '../middlewares/string-to-array.middleware.js'
import { verifyAccessToken } from '../middlewares/authorization .middleware.js'

import { getCourses, getCourse, createCourse, updateCourse, likeCourse, bookmarkCourse } from '../controllers/courses.controller.js'

const router = express.Router()

router.get('/', getCourses)
router.get('/:slug', getCourse)
router.post('/', verifyAccessToken, uploadCourseThumbnail.single('thumbnail'), stringToArray('tags'), createCourse)
router.patch('/:id', verifyAccessToken, uploadCourseThumbnail.single('thumbnail'), stringToArray('tags'), updateCourse)
router.patch('/:id/like', verifyAccessToken, likeCourse)
router.patch('/:id/bookmark', verifyAccessToken, bookmarkCourse)

export default router
