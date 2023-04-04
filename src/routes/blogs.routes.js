import express from 'express'

import { createBlog, getBlog, removeBlog, updateBlog, getBlogs } from '../controllers/blogs.controller.js'
import { stringToArray } from '../middlewares/string-to-array.middleware.js'
import { uploadCourseThumbnail } from '../middlewares/upload.middleware.js'

const router = express.Router()

router.get('/', getBlogs)
router.get('/:slug', getBlog)
router.post('/', uploadCourseThumbnail.single('thumbnail'), stringToArray('tags'), createBlog)
router.patch('/:id', uploadCourseThumbnail.single('thumbnail'), updateBlog)
router.delete('/:id', removeBlog)

export default router
