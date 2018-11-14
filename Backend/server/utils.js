const jwt = require('jsonwebtoken')
const { secret } = require('./constants')
const { PubSub } = require('apollo-server')

const pubsub = new PubSub()

const encode = user => jwt.sign({ id: user.id }, secret, { expiresIn: 86400 })
const decode = token => {
  try {
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch (err) {
    return err
  }
}

module.exports = { JWT: { encode, decode }, pubsub }
