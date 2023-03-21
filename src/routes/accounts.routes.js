import express from 'express'

import { getOtp, checkOtp, refreshToken, getMe } from '../controllers/account.controller.js'

import { verifyAccessToken } from '../middlewares/authorization .middleware.js'

const router = express.Router()

router.post('/get-otp', getOtp)
router.post('/check-otp', checkOtp)
router.post('/refresh-token', refreshToken)
router.get('/get-me', verifyAccessToken, getMe)

export default router
