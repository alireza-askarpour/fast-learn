import express from 'express'

import { createRole, getRoles, updateRole } from '../controllers/roles.controller.js'
import { stringToArray } from '../middlewares/string-to-array.middleware.js'

const router = express.Router()

router.get('/list', getRoles)
router.post('/create', stringToArray("permissions"), createRole)
router.patch('/update/:id', updateRole)

export default router
