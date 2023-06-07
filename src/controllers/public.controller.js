import createHttpError from 'http-errors'

import CourseModel from '../models/course.models.js'
import { ObjectIdValidator } from '../validations/public.validation.js'

export const findCourseById = async courseId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: courseId })
  const course = await CourseModel.findById(id)
  if (!course) throw createHttpError.NotFound('COURSE_NOT_FOUND')
  return course
}
