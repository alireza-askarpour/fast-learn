import express from 'express'

import { uploadEpisodeVideo } from '../middlewares/upload.middleware.js'

import { createEpisode, updateEpisode, removeEpisode } from '../controllers/episodes.controller.js'

const router = express.Router()

router.post('/', uploadEpisodeVideo.single('video'), createEpisode)
router.patch('/:episodeId', uploadEpisodeVideo.single('video'), updateEpisode)
router.delete('/:episodeId', removeEpisode)

export default router
