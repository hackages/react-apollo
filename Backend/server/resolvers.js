const { pubsub } = require('./utils');
const { CHECKIN_ADDED } = require('./constants');

const queries = {
  Query: {
    beer: (_, { id }, { dataSources: { dataAPI } }) => dataAPI.getBeer(id),
    beers: (_, { limit: _limit = 999 }, { dataSources: { dataAPI } }) =>
      dataAPI.allBeers(_limit),
    user: (_, { id }, { dataSources: { dataAPI }, user }) =>
      id ? dataAPI.getUser(id) : user,
    users: (_, { limit: _limit = 999 }, { dataSources: { dataAPI } }) =>
      dataAPI.allUsers(_limit),
    checkins: (_, { limit: _limit = 999 }, { dataSources: { dataAPI } }) =>
      dataAPI.getCheckIns({ _limit }),
    checkin: (_, { id }, { dataSources: { dataAPI } }) =>
      dataAPI.getCheckIn(id),
    userFeed: (_, { limit = 999 }, { dataSources: { dataAPI }, user }) =>
      dataAPI.getUserFeed(user, limit),
  },
  Beer: {
    average: ({ id }, _, { dataSources: { dataAPI } }) =>
      dataAPI.getAverage(id),
    check_ins: (
      { id: beer },
      { limit: _limit = 999 },
      { dataSources: { dataAPI } }
    ) => dataAPI.getCheckIns({ _limit, beer }),
  },
  User: {
    check_ins: (
      { id: user },
      { limit: _limit = 999 },
      { dataSources: { dataAPI } }
    ) => dataAPI.getCheckIns({ _limit, user }),
    friends: ({ friends = [] }, _, { dataSources: { dataAPI } }) =>
      dataAPI.getFriends(friends),
    beer_history: (
      { id: paramId },
      _,
      { dataSources: { dataAPI }, user: { id: ownId } }
    ) => dataAPI.getBeerHistory(paramId || ownId),
  },
  CheckIn: {
    user: ({ user }, _, { dataSources: { dataAPI } }) => dataAPI.getUser(user),
    beer: async ({ beer }, _, { dataSources: { dataAPI } }) =>
      dataAPI.getBeer(beer),
  },
};

// isn't that a nice, useful function?
const INTO_THE_VOID = (...args) => console.log('INTO THE VOID WITH YOU!', ...args);

const mutations = {
  Mutation: {
    addFriend: (_, { id }, { dataSources: { dataAPI }, user }) =>
      dataAPI.addFriend(id, user.id),
    removeFriend: (_, { id }, { dataSources: { dataAPI }, user }) =>
      dataAPI.removeFriend(id, user.id),
    createUser: (_, { username, password }, { dataSources: { dataAPI } }) =>
      dataAPI.createUser(username, password),
    signInUser: (_, { username, password }, { dataSources: { dataAPI } }) =>
      dataAPI.signInUser(username, password),
    createCheckin: (
      _,
      { beer, rating, text },
      { dataSources: { dataAPI }, user }
    ) => (user ? INTO_THE_VOID(beer, user, rating, text) : {}),
    // I return an empty object if the user is not logged in
  },
};

const subscriptions = {
  Subscription: {
    checkinAdded: {
      subscribe: async () => pubsub.asyncIterator([CHECKIN_ADDED]),
    },
  },
};

module.exports = { ...queries, ...mutations, ...subscriptions };
