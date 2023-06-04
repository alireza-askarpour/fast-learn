import express from 'express'

import { login, signup, refreshToken, getMe, loginAdmin } from '../controllers/account.controller.js'

import { verifyAccessToken } from '../middlewares/authorization .middleware.js'

const router = express.Router()

router.post('/admin/login', loginAdmin)
router.post('/login', login)
router.post('/signup', signup)
router.post('/refresh-token', refreshToken)
router.get('/me', verifyAccessToken, getMe)

export default router
