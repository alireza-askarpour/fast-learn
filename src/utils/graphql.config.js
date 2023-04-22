import { graphQLSchema } from '../graphql/index.graphql.js'

export const graphqlConfig = (req, res) => {
  return {
    schema: graphQLSchema,
    graphiql: true,
    context: { req, res },
  }
}
