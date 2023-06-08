import express from 'express'

import * as accountController from '../controllers/account.controller.js'
import { verifyAccessToken } from '../middlewares/authorization .middleware.js'
import { uploadCourseThumbnail } from '../middlewares/upload.middleware.js'

const router = express.Router()

// Auth
router.post('/admin/login', accountController.loginAdmin)
router.post('/login', accountController.login)
router.post('/signup', accountController.signup)
router.post('/refresh-token', accountController.refreshToken)

// Get me
router.get('/me', verifyAccessToken, accountController.getMe)

// Basket
router.patch('/basket/add/:courseId', verifyAccessToken, accountController.addToBasket)
router.patch(
  '/basket/remove/:courseId',
  verifyAccessToken,
  accountController.removeFromBasket
)

// Avatar
router.patch(
  '/upload-avatar',
  verifyAccessToken,
  uploadCourseThumbnail.single('avatar'),
  accountController.uploadAvatar
)
router.patch('/remove-avatar', verifyAccessToken, accountController.removeAvatar)

// Cover
router.patch(
  '/upload-cover',
  verifyAccessToken,
  uploadCourseThumbnail.single('cover'),
  accountController.uploadCover
)
router.patch('/remove-cover', verifyAccessToken, accountController.removeCover)

// Skill
router.post('/create-skill', verifyAccessToken, accountController.createSkill)
router.patch('/update-skill/:id', verifyAccessToken, accountController.updateSkill)
router.delete('/remove-skill/:id', verifyAccessToken, accountController.removeSkill)

export default router
