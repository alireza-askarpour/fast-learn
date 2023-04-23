import { GraphQLString } from 'graphql'
import { StatusCodes } from 'http-status-codes'

import BlogModel from '../../models/blog.models.js'
import CourseModel from '../../models/course.models.js'

import { verifyAccessTokenInGraphQL } from '../../middlewares/authorization .middleware.js'
import { ResponseType } from '../typeDefs/public.types.js'
import { checkExistBlog, checkExistCourse } from '../utils.js'

export const BookmarkBlog = {
  type: ResponseType,
  args: {
    blogID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context
    const { blogID } = args
    const user = await verifyAccessTokenInGraphQL(req)

    await checkExistBlog(blogID)
    const bookmarkedBlog = await BlogModel.findOne({
      _id: blogID,
      bookmarks: user._id,
    })
    const updateQuery = bookmarkedBlog ? { $pull: { bookmarks: user._id } } : { $push: { bookmarks: user._id } }
    await BlogModel.updateOne({ _id: blogID }, updateQuery)

    const message = bookmarkedBlog
      ? 'The article was removed from the favorites list'
      : 'The article has been added to the list of favorites'

    return {
      statusCode: StatusCodes.OK,
      data: {
        message,
      },
    }
  },
}

export const BookmarkCourse = {
  type: ResponseType,
  args: {
    courseID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context
    const { courseID } = args
    const user = await verifyAccessTokenInGraphQL(req)

    await checkExistCourse(courseID)
    const bookmarkedCourse = await CourseModel.findOne({
      _id: courseID,
      bookmarks: user._id,
    })
    const updateQuery = bookmarkedCourse ? { $pull: { bookmarks: user._id } } : { $push: { bookmarks: user._id } }
    const res = await CourseModel.updateOne({ _id: courseID }, updateQuery)

    const message = bookmarkedCourse
      ? 'The article was removed from the favorites list'
      : 'The article has been added to the list of favorites'

    return {
      statusCode: StatusCodes.OK,
      data: {
        message,
      },
    }
  },
}
