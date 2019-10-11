import React from 'react'
import { Query } from 'react-apollo'
import { getUser } from '../../database/queries'

export const UserProvider = ({
  children,
  id,
  detailed = false,
  history = false,
}) => {
  return (
    <Query query={getUser} variables={{ id, detailed, history }}>
      {({ loading, error, data }) =>
        !loading && data ? children({ user: data.user }) : null
      }
    </Query>
  )
}
