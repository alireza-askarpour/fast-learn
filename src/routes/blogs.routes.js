import express from 'express'

import { stringToArray } from '../middlewares/string-to-array.middleware.js'
import { uploadCourseThumbnail } from '../middlewares/upload.middleware.js'
import { verifyAccessToken } from '../middlewares/authorization .middleware.js'

import { createBlog, getBlog, removeBlog, updateBlog, getBlogs, likeBlog } from '../controllers/blogs.controller.js'

const router = express.Router()

router.get('/', getBlogs)
router.get('/:slug', getBlog)
router.post('/', verifyAccessToken, uploadCourseThumbnail.single('thumbnail'), stringToArray('tags'), createBlog)
router.patch('/:id', verifyAccessToken, uploadCourseThumbnail.single('thumbnail'), stringToArray('tags'), updateBlog)
router.patch('/:id/like', verifyAccessToken, likeBlog)
router.delete('/:id', verifyAccessToken, removeBlog)

export default router
