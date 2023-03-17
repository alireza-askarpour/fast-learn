import express from 'express'

import { getChapter, createChapter } from "../controllers/chapters.controller.js"

const router = express.Router()

router.get("/:courseId", getChapter)
router.patch("/create", createChapter)

export default router
