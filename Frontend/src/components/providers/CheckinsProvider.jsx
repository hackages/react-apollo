import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { map, prop, dropLast } from 'ramda'
import {
  getLatestCheckIns,
  checkinSubscription,
} from '../../database/queries.js'

const dropTail = dropLast(1)

const propTypes = {
  children: PropTypes.func.isRequired,
  onlyBeers: PropTypes.bool,
  limit: PropTypes.number,
}

const defaultProps = {
  onlyBeers: false,
  limit: 12,
}
export class CheckinsProvider extends PureComponent {
  render() {
    const { onlyBeers, limit, children } = this.props
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
}

CheckinsProvider.propTypes = propTypes
CheckinsProvider.defaultProps = defaultProps
