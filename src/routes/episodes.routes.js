import express from 'express'

import { uploadEpisodeVideo } from '../middlewares/upload.middleware.js'

import { createEpisode, removeEpisode } from '../controllers/episodes.controller.js'

const router = express.Router()

router.post('/create', uploadEpisodeVideo.single('video'), createEpisode)
router.delete("/remove/:episodeId", removeEpisode)

export default router
