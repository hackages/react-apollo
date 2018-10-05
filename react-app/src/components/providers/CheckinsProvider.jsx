import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import { map, prop, dropLast } from 'ramda'
import {
  getLatestCheckIns,
  checkinSubscription,
} from '../../database/queries.js'

const dropTail = dropLast(1)

export class CheckinsProvider extends PureComponent {
  static defaultProps = {
    onlyBeers: false,
    limit: 12,
  }
  render() {
    const { onlyBeers, limit, children } = this.props
    return (
      <Query query={getLatestCheckIns} variables={{ onlyBeers, limit }}>
        {({ subscribeToMore, loading, error, data: { checkins } }) => {
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
}
