import { GraphQLString } from 'graphql'
import { StatusCodes } from 'http-status-codes'

import BlogModel from '../../models/blog.models.js'
import CourseModel from '../../models/course.models.js'

import { verifyAccessTokenInGraphQL } from '../../middlewares/authorization .middleware.js'
import { ResponseType } from '../typeDefs/public.types.js'
import { checkExistBlog, checkExistCourse } from '../utils.js'

export const LikeBlog = {
  type: ResponseType,
  args: {
    blogID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context
    const { blogID } = args
    const user = await verifyAccessTokenInGraphQL(req)

    await checkExistBlog(blogID)
    const likedBlog = await BlogModel.findOne({
      _id: blogID,
      likes: user._id,
    })
    const updateQuery = likedBlog ? { $pull: { likes: user._id } } : { $push: { likes: user._id } }
    await BlogModel.updateOne({ _id: blogID }, updateQuery)

    const message = likedBlog ? 'unliked' : 'liked'

    return {
      statusCode: StatusCodes.OK,
      data: {
        message,
      },
    }
  },
}

