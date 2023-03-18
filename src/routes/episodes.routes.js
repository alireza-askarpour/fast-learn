import express from 'express'

import { uploadEpisodeVideo } from '../middlewares/upload.middleware.js'

import { createEpisode } from '../controllers/episodes.controller.js'

const router = express.Router()

router.post('/create', uploadEpisodeVideo.single('video'), createEpisode)

export default router
