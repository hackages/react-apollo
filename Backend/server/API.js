const { RESTDataSource } = require('apollo-datasource-rest');
const { URL, CHECKIN_ADDED } = require('./constants');
const {
  prop,
  identity,
  median,
  pipe,
  map,
  head,
  pickBy,
  join,
  uniq
} = require('ramda');
const bcrypt = require('bcryptjs');
const { JWT, pubsub } = require('./utils');
const uniqid = require('uniqid');

const rating = prop('rating');
const hash = password => bcrypt.hashSync(password, 8);
const removeUndefined = pickBy(identity);
const getParam = paramName => paramVal => `${paramName}=${paramVal}&`;
const formatParams = mapFn =>
  pipe(
    map(mapFn),
    join('')
  );

const getAverageRating = pipe(
  map(rating),
  identity,
  median
);

class DataAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = URL;
  }

  willSendRequest(req) {
    //console.log(req, this.context)
  }

  // BEERS

  async getBeer(id) {
    return this.get(`beers/${id}`);
  }

  async allBeers(_limit) {
    const beers = await this.get('beers', {
      _limit
    });
    return beers;
  }

  async getAverage(beer) {
    const beerCheckins = await this.getCheckIns({ beer });
    return getAverageRating(beerCheckins) || 0;
  }

  // USERS
  // ** get

  async getUser(id) {
    return this.get(`users/${id}`);
  }

  async allUsers(_limit) {
    return this.get('users', {
      _limit
    });
  }

  async getBeerHistory(user) {
    const userCheckIns = await this.get('check_ins', { user });
    const allBeersHad = map(prop('beer'))(userCheckIns);
    const uniqueBeersHad = uniq(allBeersHad);
    const averageRating = getAverageRating(userCheckIns);

    const res = {
      beersHad: allBeersHad.length,
      uniqueBeersHad: uniqueBeersHad.length,
      averageRating
    };
    return res;
  }

  // ** post

  async createUser(username, password) {
    try {
      const sameName = await this.get('users', {
        username
      });
      if (sameName.length > 0) {
        return new Error('Username already taken');
      }
    } catch (e) {
      console.log(e);
    }

    const id = uniqid();

    const user = {
      id,
      username,
      password: hash(password),
      createdAt: new Date(),
      friends: ['fdfmqg16a9jk2ko0lr']
    };

    return await this.post(`users`, user);
  }

  async signInUser(username, password) {
    let user;

    try {
      user = head(await this.get('users', { username }));
    } catch (e) {
      console.log(e);
    }

    if (!user) {
      return new Error('Cannot find user!');
    }

    const correctPW = await bcrypt.compare(password, user.password);

    const token = JWT.encode(user);
    return correctPW ? { user, token } : new Error('wrong password');
  }

  async addFriend(friendId, ownId) {
    const user = await this.get(`users/${ownId}`);
    const friends = user.friends || [];
    return this.patch(`users/${ownId}`, {
      ...user,
      friends: [...friends, friendId]
    });
  }

  async removeFriend(friendId, ownId) {
    const user = await this.get(`users/${ownId}`);
    const friends = user.friends || [];
    return this.patch(`users/${ownId}`, {
      ...user,
      friends: friends.filter(fr => fr !== friendId)
    });
  }

  async getFriends(friends) {
    const paramId = getParam('id');
    const params = formatParams(paramId)(friends);

    return friends.length ? this.get(`users?${params}`) : [];
  }

  // CHECKINS
  // ** get

  async getCheckIn(id) {
    return this.get(`check_ins/${id}`);
  }

  async getCheckIns(query) {
    return this.get('check_ins', {
      ...removeUndefined(query),
      _order: 'desc',
      _sort: 'createdAt'
    });
  }

  async getUserFeed(user, _limit) {
    const friends = user.friends || [];
    const paramUser = getParam('user');
    const params = formatParams(paramUser)([...friends, user.id]);
    return this.get(`check_ins?${params}`, {
      _limit,
      _order: 'desc',
      _sort: 'createdAt'
    });
  }
  // ** post

  async createCheckin(beer, { id: user }, rating, text) {
    const id = uniqid();
    const newCheckin = { id, beer, user, createdAt: new Date(), rating, text };
    console.log('new checkin', newCheckin)
    pubsub.publish(CHECKIN_ADDED, {
      mutation: 'CREATED',
      checkinAdded: newCheckin
    });
    return this.post('check_ins', newCheckin);
  }
}

module.exports = { DataAPI };
