import Joi from 'joi'
import createHttpError from 'http-errors'

import { MONGO_ID_PATTERN } from '../constants/regex.constant.js'

// export const createRoleSchema = Joi.object({
//   title: Joi.string()
//     .min(3)
//     .max(30)
//     .required()
//     .error(createHttpError.BadRequest('The title of the role is not correct')),
//   description: Joi.string()
//     .min(0)
//     .max(100)
//     .required()
//     .error(createHttpError.BadRequest('The role description is not correct')),
//   permissions: Joi.array()
//     .items(Joi.string().pattern(MONGO_ID_PATTERN))
//     .required()
//     .error(createHttpError.BadRequest('The permission sent are not correct')),
// })

export const createPermissionSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .error(createHttpError.BadRequest('The permission entered is not correct')),
  description: Joi.string()
    .min(0)
    .max(100)
    .required()
    .error(createHttpError.BadRequest('The description entered is not correct')),
})

export const updatePermissionSchema = Joi.object({
  name: Joi.string().min(3).max(30).error(createHttpError.BadRequest('The permission entered is not correct')),
  description: Joi.string().min(0).max(100).error(createHttpError.BadRequest('The description entered is not correct')),
})
