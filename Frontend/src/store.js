import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { take } from 'ramda'
import { sleep } from './utils'
import uniqid from 'uniqid'
import { SNACK_LIFETIME } from './constants'

const SET_USER_INFO = 'SET_USER_INFO'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const ADD_SNACK = 'ADD_SNACK'
const CLEAR_SNACK = 'CLEAR_SNACK'

const defaultUser = {
  id: '',
  username: '',
  friends: [],
}

const initialState = {
  userInfo: defaultUser,
  isLoggedIn: false,
  snacks: [],
}

export const setUserInfo = ({ username, id, friends }) => ({
  type: SET_USER_INFO,
  payload: { username, id, friends },
})

export const logIn = () => ({
  type: LOGIN,
})

export const logOut = () => ({
  type: LOGOUT,
})

export const addSnack = snack => ({
  type: ADD_SNACK,
  payload: snack,
})

export const clearSnack = id => ({
  type: CLEAR_SNACK,
  payload: id,
})

export const login = ({ user, token }) => dispatch => {
  localStorage.setItem('token', token)
  dispatch(logIn())
  dispatch(setUserInfo(user))
}

export const logout = () => dispatch => {
  localStorage.clear('token')
  dispatch(logOut())
}

export const snack = ([message, type = 'default']) => async dispatch => {
  const id = uniqid()
  const snack = { id, message, type }
  dispatch(addSnack(snack))
  await sleep(SNACK_LIFETIME)
  dispatch(clearSnack(id))
}

export const getUser = state => state.userInfo

const actions = {
  [SET_USER_INFO]: (state, { friends, ...rest }) => ({
    ...state,
    userInfo: { ...rest, friends: friends.map(friend => friend.id) },
  }),
  [LOGIN]: state => ({ ...state, isLoggedIn: true }),
  [LOGOUT]: state => ({ ...state, isLoggedIn: false, userInfo: defaultUser }),
  [ADD_SNACK]: (state, snack) => ({
    ...state,
    snacks: take(5, [snack, ...state.snacks]),
  }),
  [CLEAR_SNACK]: (state, id) => ({
    ...state,
    snacks: state.snacks.filter(snack => snack.id !== id),
  }),
}

const reducer = (state = initialState, { type, payload }) =>
  actions[type] ? actions[type](state, payload) : state

export const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunkMiddleware),
    devToolsEnhancer()
  )
)
