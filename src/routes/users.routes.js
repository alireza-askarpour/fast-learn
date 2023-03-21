import express from 'express'

import { getUser, getUsers, removeUser } from '../controllers/users.controller.js'

const router = express.Router()

router.get('/list', getUsers)
router.get('/:id', getUser)
router.delete('/remove/:id', removeUser)

export default router
