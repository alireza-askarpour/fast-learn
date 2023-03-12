import Joi from 'joi'
import createHttpError from 'http-errors'

export const categorySchema = Joi.object({
  name: Joi.string().required().error(createHttpError.BadRequest()),
  value: Joi.string().required().error(createHttpError.BadRequest()),
  subcategories: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().required().error(createHttpError.BadRequest()),
        value: Joi.string().required().error(createHttpError.BadRequest()),
        disabled: Joi.string().required().error(createHttpError.BadRequest()),
      })
    )
    .error(createHttpError.BadRequest),
})
