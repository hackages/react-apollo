const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    beer(id: Int!, detailed: Boolean): Beer
    beers(limit: Int): [Beer]
    user(id: ID): User
    users(limit: Int): [User]
    checkins(limit: Int): [CheckIn]
    userFeed(limit: Int): [CheckIn]
    checkin(id: ID!): CheckIn
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    signInUser(username: String!, password: String!): SignInPayload
    createCheckin(beer: Int, rating: Float, text: String): CheckIn
    addFriend(id: ID!): User
    removeFriend(id: ID!): User
  }

  type Subscription {
    checkinAdded: CheckIn
  }

  type Beer {
    id: Int!
    name: String!
    tagline: String!
    description: String!
    image_url: String!
    abv: Float
    ibu: Float
    food_pairing: [String!]
    average: Float
    own_rating: Float
    check_ins: [CheckIn]
  }

  type CheckIn {
    id: ID!
    user: User!
    beer: Beer!
    rating: Float
    text: String
    createdAt: String
  }

  type User {
    id: ID!
    username: String!
    createdAt: String
    check_ins: [CheckIn]
    friends: [User]
    beer_history: BeerHistory
  }

  type BeerHistory {
    beersHad: Int
    uniqueBeersHad: Int
    averageRating: Float
  }

  type SignInPayload {
    user: User
    token: String
  }
`;

module.exports = typeDefs;
