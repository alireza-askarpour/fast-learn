import express from 'express'

import * as accountController from '../controllers/account.controller.js'
import { verifyAccessToken } from '../middlewares/authorization .middleware.js'

const router = express.Router()

// Auth
router.post('/admin/login', accountController.loginAdmin)
router.post('/login', accountController.login)
router.post('/signup', accountController.signup)
router.post('/refresh-token', accountController.refreshToken)

// Account
router.get('/me', verifyAccessToken, accountController.getMe)
router.patch('/basket/add/:courseId', verifyAccessToken, accountController.AddToBasket)

export default router
