import express from 'express'

import { stringToArray } from '../middlewares/string-to-array.middleware.js'
import { uploadCourseThumbnail } from '../middlewares/upload.middleware.js'
import { verifyAccessToken } from '../middlewares/authorization .middleware.js'

import {
  createBlog,
  getBlog,
  removeBlog,
  updateBlog,
  getBlogs,
  likeBlog,
  bookmarkBlog,
  getPostComments,
} from '../controllers/blogs.controller.js'

const router = express.Router()

router.get('/', getBlogs)
router.post('/', verifyAccessToken, uploadCourseThumbnail.single('thumbnail'), stringToArray('tags'), createBlog)

router.get('/:slug', getBlog)
router.patch('/:id',  verifyAccessToken, uploadCourseThumbnail.single('thumbnail'), stringToArray('tags'), updateBlog)
router.patch('/:id/like', verifyAccessToken, likeBlog)
router.get('/:id/comments', getPostComments)
router.patch('/:id/bookmark', verifyAccessToken, bookmarkBlog)
router.delete('/:id', verifyAccessToken, removeBlog)

export default router
