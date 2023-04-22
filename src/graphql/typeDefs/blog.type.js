import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { AnyType, UserType } from './public.types.js'

export const BlogType = new GraphQLObjectType({
  name: 'BlogType',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    content: { type: GraphQLString },
    author: { type: UserType },
    thumbnail: { type: GraphQLString },
    slug: { type: GraphQLString },
    short_link: { type: GraphQLString },
    views: { type: GraphQLInt },
    tags: { type: new GraphQLList(GraphQLString) },
    reading_time: { type: GraphQLString },
    likes: { type: new GraphQLList(UserType) },
    deslikes: { type: new GraphQLList(UserType) },
    bookmark: { type: new GraphQLList(UserType) },
    comments: { type: AnyType },
  },
})
