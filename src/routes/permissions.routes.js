import express from 'express'

import { createPermission, getPermissions, updatePermission } from '../controllers/permissions.controller.js'

const router = express.Router()

router.get('/list', getPermissions)
router.post('/create', createPermission)
router.patch('/update/:id', updatePermission)

export default router
