import express from 'express'

import { getPermissions } from '../controllers/permissions.controller.js'

const router = express.Router()

router.get('/list', getPermissions)

export default router
