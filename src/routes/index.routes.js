import express from 'express'
import { verifyAccessToken } from '../middlewares/authorization .middleware.js'

import accountsRoutes from './accounts.routes.js'
import categoriesRoutes from './categories.routes.js'
import couesesRoutes from './coueses.routes.js'
import homeRoutes from './home.routes.js'

const router = express.Router()

router.use('/accounts', accountsRoutes)
router.use('/categories', categoriesRoutes)
router.use('/courses', verifyAccessToken, couesesRoutes)
router.use(homeRoutes)

export default router
