import React, { useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { sleep } from '../../utils'
import { useAuth } from '../../store'

const _ProtectedRoute = ({ history, component, path }) => {
  const { loggedIn } = useAuth()
  const isMounted = React.useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      async function hello() {
        await sleep(0.2)
        if (!loggedIn) {
          history.push('/')
        }
      }
      hello()
    }
  }, [loggedIn, history])

  useEffect(() => {
    isMounted.current = true
  }, [])

  return <Route path={path} component={component} />
}

export const ProtectedRoute = compose(
  withRouter,
)(_ProtectedRoute)
