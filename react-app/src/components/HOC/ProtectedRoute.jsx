import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

const _ProtectedRoute = ({ isLoggedIn, client, to, ...rest }) => (
  <Fragment>
    {!isLoggedIn && <Redirect from={to} to="/" />}
    <Route {...rest} />
  </Fragment>
)

export const ProtectedRoute = compose(
  connect(state => ({ isLoggedIn: state.isLoggedIn }))
)(_ProtectedRoute)
