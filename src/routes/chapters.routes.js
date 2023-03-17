import express from 'express'

import { createChapter } from "../controllers/chapters.controller.js"

const router = express.Router()

router.patch("/create", createChapter)

export default router
