import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type News {
    id: ID!
    title: String!
    description: String
    url: String!
    category: String!
    scrapedAt: String!
  }

  type Query {
    me: User
    newsByCategory(category: String!): [News!]!
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`);
