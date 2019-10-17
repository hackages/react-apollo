import React, { useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { sleep } from '../../utils'

const _ProtectedRoute = ({ history, component, path, isLoggedIn }) => {
  const isMounted = React.useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      async function hello() {
        await sleep(0.2)
        if (!isLoggedIn) {
          history.push('/')
        }
      }
      hello()
    }
  }, [isLoggedIn, history])

  useEffect(() => {
    isMounted.current = true
  }, [])

  return <Route path={path} component={component} />
}

export const ProtectedRoute = compose(
  withRouter,
  connect(state => ({ isLoggedIn: state.isLoggedIn }))
)(_ProtectedRoute)
