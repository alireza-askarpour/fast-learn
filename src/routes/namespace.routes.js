import express from 'express'

import { createNamespace, getNamespaces } from '../controllers/namespace.router.js'

const router = express.Router()

router.post('/', createNamespace)
router.get('/', getNamespaces)

export default router
