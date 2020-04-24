import React, { Fragment, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, withRouter } from 'react-router'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import { Home } from './components/pages/Home'
import { Login } from './components/pages/Login'
import { Feed } from './components/pages/Feed'
import { UserDetails } from './components/pages/UserDetails'
import { BeerDetails } from './components/pages/BeerDetails'
import { Navbar } from './components/core/Navbar'
import { ProtectedRoute } from './components/core/ProtectedRoute'
import { Snacks } from './components/core/Snacks'
import { getUser } from './API/queries'
import { useSnack, useAuth } from './store'
import { greet } from './utils'
import { UserType } from './types'
import './App.css'

const propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    user: UserType,
  }),
}

const _App = ({ data }) => {
  const { addSnack } = useSnack()
  const { loggedIn, signIn } = useAuth()
  const [prevLoading, setprevLoading] = useState(true)

  const onFetch = useCallback(user => {
    signIn(user, localStorage.getItem('token'))
    addSnack(greet(user.username))
  }, [signIn, addSnack])

  useEffect(() => {
    if (data) {
      const { loading, error, user } = data
      if (!loading && !error && !loggedIn && prevLoading) {
        onFetch(user)
        setprevLoading(prevLoading => !prevLoading)
      }
    }
  }, [data, onFetch, loggedIn, prevLoading])

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
