import express from 'express'

import accountsRoutes from './accounts.routes.js'
import homeRoutes from './home.routes.js'

const router = express.Router()

router.use("/accounts", accountsRoutes)
router.use(homeRoutes)

export default router
