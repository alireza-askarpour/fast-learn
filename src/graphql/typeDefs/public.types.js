import { GraphQLBoolean, GraphQLObjectType, GraphQLScalarType, GraphQLString } from 'graphql'
import { toObject, parseLiteral } from '../utils.js'

export const AnyType = new GraphQLScalarType({
  name: 'AnyType',
  parseValue: toObject,
  serialize: toObject,
  parseLiteral: parseLiteral,
})

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
  },
})

export const PublicCategoryType = new GraphQLObjectType({
  name: 'PublicCategoryType',
  fields: {
    _id: { type: GraphQLString },
    value: { type: GraphQLString },
    disabled: { type: GraphQLBoolean },
    parent: { type: GraphQLString },
  },
})

export const ResponseType = new GraphQLObjectType({
  name: 'ResponseType',
  fields: {
    statusCode: { type: GraphQLString },
    data: { type: AnyType },
  },
})
