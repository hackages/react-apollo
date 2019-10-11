import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { sleep } from '../../utils'

class _ProtectedRoute extends Component {
  componentDidMount = async () => {
    const { history } = this.props
    await sleep(0.2)
    if (!this.props.isLoggedIn) {
      history.push('/')
    }
  }

  render() {
    const { component, path } = this.props
    return <Route path={path} component={component} />
  }
}

export const ProtectedRoute = compose(
  withRouter,
  connect(state => ({ isLoggedIn: state.isLoggedIn }))
)(_ProtectedRoute)
