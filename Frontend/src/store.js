import { sleep } from './utils'
import { useMutation, useQuery } from 'react-apollo'
import { removeSnack as removeSnackM, addSnack as addSnackM, logIn as logInM, logOut as logOutM, updateUser as updateUserM } from './API/mutations'
import { getSnacks, getUserInfo, isLoggedIn } from './API/queries'
import { path } from 'ramda'

export const useSnack = (duration = 5) => {
  const { data: { snacks } } = useQuery(getSnacks)
  const [add] = useMutation(addSnackM)
  const [remove] = useMutation(removeSnackM)

  const addSnack = async (message, type = "success") => {
    const { data: { addSnack: { id } } } = await add({ variables: { message, type } })
    await sleep(duration)
    remove({ variables: { id } })
  }

  const removeSnack = id => {
    remove({ variables: { id } })
  }

  return { snacks, addSnack, removeSnack }
}

export const useAuth = () => {
  const { data: { isLoggedIn: loggedIn } } = useQuery(isLoggedIn)
  const { data } = useQuery(getUserInfo)
  const [logIn] = useMutation(logInM)
  const [logOut] = useMutation(logOutM)
  const [setUserInfo] = useMutation(updateUserM)

  const signIn = (userInfo, token) => {
    localStorage.setItem('token', token)
    logIn({ variables: { userInfo } })
  }

  const signOut = () => {
    localStorage.clear('token')
    logOut()
  }

  const updateUser = (userInfo) => {
    setUserInfo({
      variables: {
        userInfo
      }
    })
  }

  return {
    loggedIn,
    userInfo: path(['userInfo'], data),
    signIn,
    signOut,
    updateUser
  }
}