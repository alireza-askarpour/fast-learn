import express from 'express'

import { getUser, getUsers } from '../controllers/users.controller.js'

const router = express.Router()

router.get('/list', getUsers)
router.get('/:id', getUser)

export default router
