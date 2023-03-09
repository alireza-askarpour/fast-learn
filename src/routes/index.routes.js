import express from 'express'
import homeRoutes from './home.routes.js'

const router = express.Router()

router.use(homeRoutes)

export default router
