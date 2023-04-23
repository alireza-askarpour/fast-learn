import JWT from 'jsonwebtoken'
import createHttpError from 'http-errors'
import UserModels from '../models/user.models.js'

export const verifyAccessToken = (req, res, next) => {
  try {
    if (!req.headers?.authorization) {
      return next(createHttpError.Unauthorized('User account not recognized. Login to your account'))
    }

    const [bearer, token] = req.headers?.authorization?.split(' ')
    const validData = ['Bearer', 'bearer']

    if (!token || !validData.includes(bearer)) {
      return next(createHttpError.Unauthorized('User account not recognized. Login to your account'))
    }

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, paylod) => {
      if (err) return next(createHttpError.Unauthorized('Login to your account'))

      const user = await UserModels.findOne({ mobile: paylod.mobile }, { password: 0, otp: 0 })
      if (!user) return next(createHttpError.NotFound('User account not found'))

      req.user = user
      return next()
    })
  } catch (err) {
    next(err)
  }
}

export const verifyAccessTokenInGraphQL = async req => {
  try {
    if (!req.headers?.authorization) {
      return next(createHttpError.Unauthorized())
    }

    const [bearer, token] = headers?.authorization?.split(' ') || []
    const validData = ['Bearer', 'bearer']
    if (!token || !validData.includes(bearer)) throw createHttpError.Unauthorized()

    const { mobile } = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
    const user = await UserModels.findOne({ mobile }, { password: 0, otp: 0 })
    if (!user) throw createHttpError.Unauthorized()
    return user
  } catch (error) {
    throw createHttpError.Unauthorized()
  }
}
