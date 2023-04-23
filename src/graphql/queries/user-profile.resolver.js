import { GraphQLList } from 'graphql'

import { BlogType } from '../typeDefs/blog.type.js'
import CourseModel from '../../models/course.models.js'
import { verifyAccessTokenInGraphQL } from '../../middlewares/authorization .middleware.js'

export const getBookmarkedCourses = {
  type: new GraphQLList(BlogType),
  resolve: async (_, args, context) => {
    const { req } = context
    const user = await verifyAccessTokenInGraphQL(req)
    const courses = await CourseModel.find({ bookmarks: user._id }).populate([
      { path: 'category' },
      { path: 'teacher' },
    ])
    return courses
  },
}
