import { GraphQLObjectType, GraphQLSchema } from 'graphql'

import { BlogResolver } from './queries/blog.resolver.js'
import { CourseResolver } from './queries/course.resolver.js'
import { getBookmarkedBlog, getBookmarkedCourse } from './queries/user-profile.resolver.js'

import { LikeBlog } from './mutations/likes.resolver.js'
import { BookmarkBlog, BookmarkCourse } from './mutations/booksmarks.resolver.js'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    blogs: BlogResolver,
    courses: CourseResolver,
    getBookmarkedBlog,
    getBookmarkedCourse,
  },
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    BookmarkBlog,
    BookmarkCourse,
    LikeBlog,
  },
})

export const graphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})
