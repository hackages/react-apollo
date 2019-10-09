import React, { Component } from 'react'
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
      // How is this registering a new user? 🤔
      // ⬇️ Note that I want you to be able to log in first before registering ⬇️
      console.log('general Kenobi')
    }
    const {
      signInUser: { token, user },
    } = (await signInUser({
      variables: {
        // ☞ Fix this first!
        // I'm not sure this data is correct 🤨
        'hello there': 'general Kenobi',
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
