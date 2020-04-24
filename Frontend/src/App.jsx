import React, { Fragment, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { Switch, Route, withRouter } from 'react-router'
import { compose } from 'redux'
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

const _App = () => {
  const { addSnack } = useSnack()
  const { loggedIn, signIn } = useAuth()
  const { loading, error, data } = useQuery(getUser, {
    variables: {
      detailed: false,
      history: false,
    },
    skip: !localStorage.getItem('token'),
  })
  const [prevLoading, setprevLoading] = useState(true)

  const onFetched = useCallback(user => {
    signIn(user, localStorage.getItem('token'))
    addSnack(greet(user.username))
  }, [signIn, addSnack])

  // locally sign in user (once) if they were fetched from local storage token
  useEffect(() => {
    if (!loading && !error && !loggedIn && prevLoading && data) {
      console.log('will sign')
      onFetched(data.user)
      setprevLoading(prevLoading => !prevLoading)
    }
  }, [data, onFetched, loggedIn, prevLoading, error, loading])

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
)(_App)

export default App
