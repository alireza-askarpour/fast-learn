import { GraphQLList } from 'graphql'

import { BlogType } from '../typeDefs/blog.type.js'
import { CourseType } from '../typeDefs/course.type.js'

import BlogModel from '../../models/blog.models.js'
import CourseModel from '../../models/course.models.js'

import { verifyAccessTokenInGraphQL } from '../../middlewares/authorization .middleware.js'

export const getBookmarkedBlog = {
  type: new GraphQLList(BlogType),
  resolve: async (_, args, context) => {
    const { req } = context
    const user = await verifyAccessTokenInGraphQL(req)
    const blogs = await BlogModel.find({ bookmarks: user._id }).populate([{ path: 'author' }])
    return blogs
  },
}

export const getBookmarkedCourse = {
  type: new GraphQLList(CourseType),
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
