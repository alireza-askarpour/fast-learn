import express from 'express'

import { getRoles } from '../controllers/roles.controller.js'

const router = express.Router()

router.get('/list', getRoles)

export default router
