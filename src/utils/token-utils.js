import JWT from 'jsonwebtoken'
import createError from 'http-errors'
import UserModel from '../models/user.models.js'

export const signAccessToken = email => {
  return new Promise(async (resolve, reject) => {
    const payload = { email }
    const options = { expiresIn: '30d' }

    JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) reject(createError.InternalServerError('INTERNAL_SERVER_ERROR'))
      resolve(token)
    })
  })
}

export const signRefreshToken = email => {
  return new Promise(async (resolve, reject) => {
    const payload = { email }
    const options = { expiresIn: '1y' }

    JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) reject(createError.InternalServerError('INTERNAL_SERVER_ERROR'))
      resolve(token)
    })
  })
}

export const verifyRefreshToken = token => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err) return reject(createError.Unauthorized('USER_UNAUTHORIZED'))

      const user = await UserModel.findOne({ email: payload.email }, { password: 0 })
      if (!user) reject(createError.Unauthorized('USER_UNAUTHORIZED'))

      resolve(payload.email)
    })
  })
}
