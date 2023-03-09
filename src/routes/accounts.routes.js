import express from 'express'

import * as accountController from '../controllers/account.controller.js'

const router = express.Router()

router.post('/get-otp', accountController.getOtp)
router.post('/check-otp', accountController.checkOtp)

export default router
