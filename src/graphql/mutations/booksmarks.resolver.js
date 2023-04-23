import { GraphQLString } from 'graphql'
import { StatusCodes } from 'http-status-codes'

import { verifyAccessTokenInGraphQL } from '../../middlewares/authorization .middleware.js'
import { ResponseType } from '../typeDefs/public.types.js'
import BlogModel from '../../models/blog.models.js'
import { checkExistBlog } from '../utils.js'

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
    const res = await BlogModel.updateOne({ _id: blogID }, updateQuery)

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
