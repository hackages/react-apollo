const { ApolloServer, AuthenticationError } = require("apollo-server");
const { DBServer } = require('./db/db')
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { DataAPI } = require("./API");
const { JWT } = require("./utils");
const axios = require("axios");
const { URL } = require("./constants");
const { path } = require("ramda");

const dataAPI = new DataAPI();
const PORT = 4000;
const DB_PORT = 1234;

const getUserFromToken = async (token) => {
  try {
    const { id } = JWT.decode(token);
    return (await axios.get(`${URL}/users/${id}`)).data
  }
  catch (e) {
    throw new AuthenticationError();
  }
}

// Apollo server: queries and mutations
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    dataAPI
  }),
  context: async ({ req, connection }) => {
    if (connection) { // specific to WS subscriptions
      return { ...connection.context, dataSources: { dataAPI } }
    }
    // get the user token from the headers
    const token = path(["headers", "authorization"], req);
    let user;
    if (token) {
      user = await getUserFromToken(token)
    }
    // add the user to the context
    return { user };
  },
  subscriptions: {
    onConnect: async (connectionParams) => {
      let user;
      if (connectionParams.authToken) {
        user = await getUserFromToken(connectionParams.authToken)
      }
      return { user }
    }
  }
});

// Time to listen on numerous ports!!
DBServer.listen(DB_PORT, () => {
  console.log(`🐙 JSON Server ready at localhost:${DB_PORT}`);
});

server.listen({ port: PORT }).then(({ url, subscriptionsUrl }) => {
  console.log(`🐱 Server ready at ${url}`);
  console.log(`🐸 Subscriptions server ready at ${subscriptionsUrl}`);
});
