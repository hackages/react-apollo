import React from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { sleep } from '../../utils'

const propTypes = {
  wait: PropTypes.bool,
}
const defaultProps = {
  wait: false,
}

class _ProtectedRoute extends React.Component {
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

ProtectedRoute.propTypes = propTypes
ProtectedRoute.defaultProps = defaultProps
