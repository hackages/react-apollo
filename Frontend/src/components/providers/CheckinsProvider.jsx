import React from 'react'
import { Query } from 'react-apollo'
import { map, prop, dropLast } from 'ramda'
import {
  getLatestCheckIns,
  checkinSubscription,
} from '../../database/queries.js'

const dropTail = dropLast(1)

export const CheckinsProvider = ({
  onlyBeers = false,
  limit = 12,
  children,
}) => {
  return (
    <Query query={getLatestCheckIns} variables={{ onlyBeers, limit }}>
      {({ subscribeToMore, loading, error, data }) => {
        const checkins = data && data.checkins ? data.checkins : []
        const beers = loading ? [] : map(prop('beer'))(checkins)
        return (
          !loading &&
          children({
            loading,
            error,
            checkins,
            beers,
            subscribeToMore: () =>
              subscribeToMore({
                document: checkinSubscription,
                variables: {
                  onlyBeers,
                },
                updateQuery: (
                  { checkins: received },
                  {
                    subscriptionData: {
                      data: { checkinAdded },
                    },
                  }
                ) => {
                  return checkinAdded
                    ? {
                        checkins: [checkinAdded, ...dropTail(received)],
                      }
                    : {
                        checkins: received,
                      }
                },
              }),
          })
        )
      }}
    </Query>
  )
}
