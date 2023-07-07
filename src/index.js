import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import createHttpError from 'http-errors'
import swaggerUI from 'swagger-ui-express'

import { appListener, appErrorHandler, port } from './config/app.config.js'
import connectDB from './config/database.config.js'
import { initRedis } from './config/init-redis.config.js'
import { swaggerSetup } from './config/swagger.config.js'

import { morganMiddleware } from './middlewares/morgan.middleware.js'

import allRoutes from './routes/index.routes.js'

// Config
dotenv.config()
connectDB()
initRedis()

const app = express()

// Middlewares
app.use(morganMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))

// Settings
app.use('/docs', swaggerUI.serve, swaggerSetup)

// Auth
app.use(cors({ origin: '*' }))

// Routes
app.use(allRoutes)

// Error Handler
app.use('*', (req, res, next) => {
  next(createHttpError.NotFound(`Can't find ${req.originalUrl} on the server!`))
})
app.use(appErrorHandler)

// Listener
app.listen(port, appListener)
