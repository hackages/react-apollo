import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo'
import { withRouter } from 'react-router'
import { createUser, signInUser } from '../../database/queries'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { login, snack } from '../../store'
import {
  WhiteTitle,
  LoginContainer,
  Column,
  LoginButton,
  LinkButton,
} from '../styled/globalStyles'
import { LabelledInput } from '../dumb/LabelledInput'

const propTypes = {
  logUserIn: PropTypes.func.isRequired,
  snack: PropTypes.func.isRequired,
}

const _Login = ({ history, logUserIn, snack }) => {
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
        snack([err.message, 'error'])
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
      logUserIn({ token, user })
      snack([`Welcome ${username}`, 'success'])
      history.push('/feed')
    } catch (err) {
      snack([err.message, 'error'])
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

_Login.propTypes = propTypes

export const Login = compose(
  withRouter,
  connect(
    ({ userInfo }) => ({ userInfo }),
    dispatch => ({
      logUserIn: payload => dispatch(login(payload)),
      snack: payload => dispatch(snack(payload)),
    })
  )
)(_Login)
