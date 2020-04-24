import { take } from "ramda"
import uniqid from 'uniqid'
import { getSnacks } from "./queries"


const USER_INFO = 'UserInfo'
const SNACK = 'Snack'

const userInfo = {
  id: '',
  username: 'Jon',
  friends: [],
  __typename: USER_INFO,
}

export const resolvers = {
  Mutation: {
    logIn: (_, { userInfo }, { cache }) => {
      const data = {
        isLoggedIn: true,
        userInfo: { ...userInfo, __typename: USER_INFO },
      }
      cache.writeData({ data })
      return userInfo
    },
    logOut: (_, args, { cache }) => {
      const data = { isLoggedIn: false, userInfo }
      cache.writeData({ data })
      return userInfo
    },
    updateUser: (_, { userInfo }, { cache }) => {
      const data = {
        userInfo: { ...userInfo, __typename: USER_INFO },
      }
      cache.writeData({ data })
      return userInfo
    },
    addSnack: (_, { message, type }, { cache }) => {
      const id = uniqid()
      const snack = { id, message, type, __typename: SNACK }
      const { snacks: oldSnacks } = cache.readQuery({ query: getSnacks })
      const snacks = take(5, [snack, ...oldSnacks])
      cache.writeQuery({ query: getSnacks, data: { snacks } })
      return snack
    },
    removeSnack: (_, { id }, { cache }) => {
      const { snacks: oldSnacks } = cache.readQuery({ query: getSnacks })
      const snacks = oldSnacks.filter(({ id: snackId }) => snackId !== id)
      cache.writeQuery({ query: getSnacks, data: { snacks } })
      return snacks
    },
  },
}