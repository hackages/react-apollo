import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
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

  const updateFields = ({ target: { value, name } }) => {
    name === 'password' ? setpassword(value) : setusername(value)
  }

  const confirm = (signInUser, createUser) => async () => {
    if (!login) {
      try {
        await createUser({
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
      } = (await signInUser({
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
    <Mutation mutation={signInUser}>
      {signInUser => (
        <Mutation mutation={createUser}>
          {createUser => (
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
                <LoginButton onClick={confirm(signInUser, createUser)}>
                  {login ? 'login' : 'create account'}
                </LoginButton>
                <LinkButton onClick={toggleLogin}>
                  {login
                    ? 'need to create an account?'
                    : 'already have an account?'}
                </LinkButton>
              </Column>
            </LoginContainer>
          )}
        </Mutation>
      )}
    </Mutation>
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
