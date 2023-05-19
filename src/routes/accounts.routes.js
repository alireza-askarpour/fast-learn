import express from 'express'

import { login, signup, refreshToken, getMe } from '../controllers/account.controller.js'

import { verifyAccessToken } from '../middlewares/authorization .middleware.js'

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/refresh-token', refreshToken)
router.get('/get-me', verifyAccessToken, getMe)

export default router
