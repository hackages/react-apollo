import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { LabelledInput } from '../core/LabelledInput'
import { useAuth, useSnack } from '../../store'
import {
  WhiteTitle,
  LoginContainer,
  Column,
  LoginButton,
  LinkButton,
} from '../styled/globalStyles'
import { createUser, signInUser } from '../../API/mutations'

const _Login = ({ history }) => {
  const { signIn } = useAuth()
  const { addSnack } = useSnack()
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [login, setlogin] = useState(false)

  const [createUserM] = useMutation(createUser)
  const [signInUserM] = useMutation(signInUser)

  const updateFields = ({ target: { value, name } }) => {
    name === 'password' ? setpassword(value) : setusername(value)
  }

  const confirm = () => async () => {
    if (!login) {
      try {
        await createUserM({
          variables: {
            username,
            password,
          },
        })
      } catch (err) {
        addSnack(err.message, 'error')
      }
    }
    try {
      const {
        signInUser: { token, user },
      } = (await signInUserM({
        variables: {
          username,
          password,
        },
      })).data
      signIn(user, token)
      addSnack(`Welcome ${username}`)
      history.push('/feed')
    } catch (err) {
      addSnack(err.message, 'error')
    }
  }

  const toggleLogin = () => setlogin(login => !login)

  return (
    <LoginContainer>
      <WhiteTitle>{login ? 'Login' : 'Sign Up'}</WhiteTitle>
      <Column>
        <LabelledInput
          name="username"
          type="text"
          label="Your username"
          value={username}
          onChange={updateFields}
        />
        <LabelledInput
          name="password"
          type="password"
          value={password}
          label="Password"
          onChange={updateFields}
        />
        <LoginButton onClick={confirm()}>
          {login ? 'login' : 'create account'}
        </LoginButton>
        <LinkButton onClick={toggleLogin}>
          {login ? 'need to create an account?' : 'already have an account?'}
        </LinkButton>
      </Column>
    </LoginContainer>
  )
}

export const Login = compose(
  withRouter,
)(_Login)
