import express from 'express'

import { getChapters, createChapter, updateChapter, removeChapter } from '../controllers/chapters.controller.js'

const router = express.Router()

router.get('/:courseId', getChapters)
router.patch('/create', createChapter)
router.patch('/update/:chapterId', updateChapter)
router.patch('/remove/:chapterId', removeChapter)

export default router
