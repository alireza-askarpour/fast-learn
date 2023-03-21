import express from 'express'

import { createPermission, getPermissions } from '../controllers/permissions.controller.js'

const router = express.Router()

router.get('/list', getPermissions)
router.post('/create', createPermission)

export default router
