import { GraphQLList, GraphQLString } from 'graphql'

import CourseModel from '../../models/course.models.js'
import { CourseType } from '../typeDefs/course.type.js'

export const CourseResolver = {
  type: new GraphQLList(CourseType),
  args: {
    category: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const { category } = args
    const findQuery = category ? { category } : {}
    return await CourseModel.find(findQuery).populate([{ path: 'category' }, { path: 'teacher' }])
  },
}
