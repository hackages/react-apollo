import { useQuery } from 'react-apollo'
import { map, prop, dropLast } from 'ramda'
import {
  getLatestCheckIns,
  checkinSubscription,
} from '../../../API/queries.js'

const dropTail = dropLast(1)

export const CheckinsProvider = ({
  onlyBeers = false,
  limit = 12,
  children,
}) => {
  const { subscribeToMore, loading, error, data } = useQuery(
    getLatestCheckIns,
    { variables: { onlyBeers, limit } }
  )
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
}
