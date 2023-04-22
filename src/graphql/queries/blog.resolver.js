import { GraphQLList, GraphQLString } from 'graphql'

import { BlogType } from '../typeDefs/blog.type.js'
import BlogModel from '../../models/blog.models.js'

export const BlogResolver = {
  type: new GraphQLList(BlogType),
  args: {
    category: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const { category } = args
    const findQuery = category ? { category } : {}
    const test = await BlogModel.find(findQuery).populate([{
      path: 'author'
    }])
    return test
  },
}
