import express from 'express'

import { uploadCourseThumbnail } from '../middlewares/upload.middleware.js'

import { createRoom, getRooms } from '../controllers/rooms.controller.js'

const router = express.Router()

router.post('/', uploadCourseThumbnail.single('image'), createRoom)
router.get('/', getRooms)

export default router
