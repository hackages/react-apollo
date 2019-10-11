import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, withRouter } from 'react-router'
import { connect } from 'react-redux'
import './App.css'
import { graphql } from 'react-apollo'
import { Navbar } from './components/dumb/Navbar'
import { Home } from './components/views/Home'
import { Login } from './components/views/Login'
import { Feed } from './components/views/Feed'
import { getUser } from './database/queries'
import { snack, login } from './store'
import { greet } from './utils'
import { compose } from 'redux'
import { Snacks } from './components/containers/Snacks'
import { UserDetails } from './components/views/UserDetails'
import { ProtectedRoute } from './components/HOC/ProtectedRoute'
import { BeerDetails } from './components/views/BeerDetails'
import { UserType } from './types'

const propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    user: UserType,
  }),
  logUserIn: PropTypes.func.isRequired,
  snack: PropTypes.func.isRequired,
}

const _App = ({ data, isLoggedIn, logUserIn, snack }) => {
  const [prevLoading, setprevLoading] = useState(true)

  useEffect(() => {
    if (data) {
      const { loading, error, user } = data
      if (!loading && !error && !isLoggedIn && prevLoading) {
        onFetch(user)
        setprevLoading(prevLoading => !prevLoading)
      }
    }
  }, [data])

  const onFetch = user => {
    logUserIn({ user, token: localStorage.getItem('token') })
    snack([greet(user.username), 'success'])
  }

  return data && data.loading ? null : (
    <div id="app">
      <Fragment>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/feed" component={Feed} />
          <ProtectedRoute path="/user/:id" component={UserDetails} />
          <ProtectedRoute path="/beer/:id" component={BeerDetails} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Fragment>
      <Snacks />
    </div>
  )
}

_App.propTypes = propTypes

const App = compose(
  withRouter,
  connect(
    state => ({ isLoggedIn: state.isLoggedIn }),
    dispatch => ({
      logUserIn: payload => dispatch(login(payload)),
      snack: payload => dispatch(snack(payload)),
    })
  ),
  graphql(getUser, {
    options: {
      variables: {
        detailed: false,
        history: false,
      },
    },
    skip: !localStorage.getItem('token'),
  })
)(_App)

export default App
