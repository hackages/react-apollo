import React from 'react'
import { PropTypes } from 'prop-types'
import { getUserFeed, checkinSubscription } from '../../database/queries'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import { getUser } from '../../store'

const propTypes = {
  limit: PropTypes.number,
}

const defaultProps = {
  limit: 18,
}

const _UserFeedProvider = ({ limit, user, children }) => {
  return (
    <Query query={getUserFeed} variables={{ limit }}>
      {({ subscribeToMore, loading, error, data }) => {
        const userFeed = data && data.userFeed ? data.userFeed : {}
        return (
          !loading &&
          children({
            loading,
            error,
            userFeed,
            subscribeToMore: () =>
              subscribeToMore({
                document: checkinSubscription,
                variables: {
                  onlyBeers: false,
                },
                // where did my feed go? 😥
                // (hint: updateQuery actually has two arguments)
                updateQuery: _ => {
                  console.log('hello there')
                },
              }),
          })
        )
      }}
    </Query>
  )
}

_UserFeedProvider.propTypes = propTypes
_UserFeedProvider.defaultProps = defaultProps

export const UserFeedProvider = connect(state => ({
  user: getUser(state),
}))(_UserFeedProvider)
