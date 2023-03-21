import express from 'express'

import { verifyAccessToken } from '../middlewares/authorization .middleware.js'

import accountsRoutes from './accounts.routes.js'
import categoriesRoutes from './categories.routes.js'
import couesesRoutes from './coueses.routes.js'
import chaptersRoutes from './chapters.routes.js'
import episodesRoutes from './episodes.routes.js'
import blogsRoutes from './blogs.routes.js'
import usersRoutes from './users.routes.js'
import permissionsRoutes from './permissions.routes.js'
import homeRoutes from './home.routes.js'

const router = express.Router()

router.use('/accounts', accountsRoutes)
router.use('/categories', categoriesRoutes)
router.use('/courses', verifyAccessToken, couesesRoutes)
router.use('/chapters', verifyAccessToken, chaptersRoutes)
router.use('/episodes', verifyAccessToken, episodesRoutes)
router.use('/blogs', verifyAccessToken, blogsRoutes)
router.use('/users', verifyAccessToken, usersRoutes)
router.use('/permissions', verifyAccessToken, permissionsRoutes)
router.use(homeRoutes)

export default router
