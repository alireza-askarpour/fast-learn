import express from 'express'

import { createNamespace } from '../controllers/namespace.router.js'

const router = express.Router()

router.post('/create', createNamespace)

export default router
