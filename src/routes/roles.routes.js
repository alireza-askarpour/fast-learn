import express from 'express'

import { createRole, getRoles } from '../controllers/roles.controller.js'
import { stringToArray } from '../middlewares/string-to-array.middleware.js'

const router = express.Router()

router.get('/list', getRoles)
router.post('/create', stringToArray("permissions"), createRole)

export default router
