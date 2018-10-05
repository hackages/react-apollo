import React, { Component } from 'react'
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

class _Login extends Component {
  state = {
    login: false,
    username: '',
    password: '',
  }

  updateFields = ({ target: { value, name } }) => {
    this.setState(state => ({
      [name]: value,
    }))
  }

  confirm = (signInUser, createUser) => async () => {
    const { login, username, password } = this.state
    const { history, logUserIn, snack } = this.props
    if (!login) {
      await createUser({
        variables: {
          username,
          password,
        },
      })
    }
    const {
      signInUser: { token, user },
    } = (await signInUser({
      variables: {
        username,
        password,
      },
    })).data
    logUserIn({ token, user })
    snack([`Welcome ${login && 'back '} ${username}`, 'success'])
    history.push('/feed')
  }

  toggleLogin = () => this.setState(({ login }) => ({ login: !login }))

  render() {
    const { login, username, password } = this.state
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
                    onChange={this.updateFields}
                  />
                  <LabelledInput
                    name="password"
                    type="password"
                    value={password}
                    label="Password"
                    onChange={this.updateFields}
                  />
                  <LoginButton onClick={this.confirm(signInUser, createUser)}>
                    {login ? 'login' : 'create account'}
                  </LoginButton>
                  <LinkButton onClick={this.toggleLogin}>
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
}

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
