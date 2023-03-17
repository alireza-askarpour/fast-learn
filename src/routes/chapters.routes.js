import express from 'express'

import { getChapters, createChapter, updateChapter } from '../controllers/chapters.controller.js'

const router = express.Router()

router.get('/:courseId', getChapters)
router.patch('/create', createChapter)
router.patch('/update/:chapterId', updateChapter)

export default router
