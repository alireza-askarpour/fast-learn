import JWT from 'jsonwebtoken'
import createHttpError from 'http-errors'
import UserModels from '../models/user.models.js'

export const verifyAccessToken = (req, res, next) => {
  try {
    const [bearer, token] = req.headers?.authorizarion
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
