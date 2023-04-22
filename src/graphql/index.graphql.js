import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { BlogResolver } from './queries/blog.resolver.js'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    blogs: BlogResolver,
  },
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {},
})

export const graphQLSchema = new GraphQLSchema({
  query: RootQuery,
  //   mutation: RootMutation,
})
