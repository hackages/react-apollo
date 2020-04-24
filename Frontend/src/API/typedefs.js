import gql from "graphql-tag";


export const typeDefs = gql`
type User {
  id: String
  username: String
  friends: [User]
  createdAt: Date
}
type Snack {
  message: String!
  type: String!
  id: String!
}
type Mutation {
  addSnack(type: String!, message: String!): Snack
  removeSnack(id: String!): [Snack]
  logIn(userInfo: User!, token: String!): User
  logOut: User
}
type Query {
  snacks: [Snack]
  userInfo: User
  isLoggedIn: Boolean
}
`