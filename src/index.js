import dotenv from 'dotenv'
import express from 'express'
import createHttpError from 'http-errors'

import { appListener, appErrorHandler, port } from './config/app.config.js'
import connectDB from './config/database.config.js'
import allRoutes from './routes/index.routes.js'

import { morganMiddleware } from './middlewares/morgan.middleware.js'

// Config
dotenv.config()
connectDB()

const app = express()

// Middlewares
app.use(morganMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))

// Routes
app.use(allRoutes)

// Error Handler
app.use('*', (req, res, next) => {
  next(createHttpError.NotFound(`Can't find ${req.originalUrl} on the server!`))
})
app.use(appErrorHandler)

// Listener
app.listen(port, appListener)
