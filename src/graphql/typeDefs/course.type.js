import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { AnyType, PublicCategoryType, UserType } from './public.types.js'

const EpisodeTypes = new GraphQLObjectType({
  name: 'EpisodeTypes',
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    type: { type: GraphQLString },
    time: { type: GraphQLString },
    videoAddress: { type: GraphQLString },
  },
})

const ChaptersType = new GraphQLObjectType({
  name: 'ChaptersType',
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    episodes: { type: new GraphQLList(EpisodeTypes) },
  },
})

export const CourseType = new GraphQLObjectType({
  name: 'CourseType',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    slug: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    price: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    tags: { type: new GraphQLList(GraphQLString) },
    type: { type: GraphQLString },
    teacher: { type: UserType },
    status: { type: GraphQLString },
    level: { type: GraphQLString },
    short_link: { type: GraphQLString },
    category: { type: PublicCategoryType },
    comments: { type: AnyType },
    likes: { type: new GraphQLList(UserType) },
    deslikes: { type: new GraphQLList(UserType) },
    bookmarks: { type: new GraphQLList(UserType) },
    chapters: { type: new GraphQLList(ChaptersType) },
  },
})
