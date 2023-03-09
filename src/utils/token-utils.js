import JWT from 'jsonwebtoken'
import createHttpError from 'http-errors'
import UserModels from '../models/user.models.js'

export const signAccessToken = userId => {
  return new Promise(async (resolve, reject) => {
    const user = await UserModels.findById(userId)

    const payload = {
      mobile: user.mobile,
    }
    const options = {
      expiresIn: '30d',
    }

    JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) reject(createHttpError.InternalServerError())
      resolve(token)
    })
  })
}
