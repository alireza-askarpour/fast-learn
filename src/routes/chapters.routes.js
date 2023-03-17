import express from 'express'

import { getChapter, createChapter, updateChapter } from '../controllers/chapters.controller.js'

const router = express.Router()

router.get('/:courseId', getChapter)
router.patch('/create', createChapter)
router.patch('/update/:chapterId', updateChapter)

export default router
