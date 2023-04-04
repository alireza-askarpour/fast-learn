import express from 'express'

import {
  createPermission,
  getPermissions,
  removePermission,
  updatePermission,
} from '../controllers/permissions.controller.js'

const router = express.Router()

router.get('/', getPermissions)
router.post('/', createPermission)
router.patch('/:id', updatePermission)
router.delete('/:id', removePermission)

export default router
