import express from 'express'

import { getUser, getUsers, removeUser } from '../controllers/users.controller.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.delete('/:id', removeUser)

export default router
