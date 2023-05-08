import express from 'express'

import { createRole, getRoles, removeRole, updateRole } from '../controllers/roles.controller.js'
import { stringToArray } from '../middlewares/string-to-array.middleware.js'

const router = express.Router()

router.get('/', getRoles)
router.post('/', stringToArray('permissions'), createRole)
router.patch('/:id', stringToArray('permissions'), updateRole)
router.delete('/:field', removeRole)

export default router
