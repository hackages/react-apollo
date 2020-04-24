import { PropTypes } from 'prop-types'
import { useQuery } from 'react-apollo'
import { useAuth } from '../../../store'
import { getUserFeed, checkinSubscription } from '../../../API/queries'

const propTypes = {
  limit: PropTypes.number,
}

export const UserFeedProvider = ({ limit = 18, children }) => {
  const { userInfo } = useAuth()
  const { subscribeToMore, loading, error, data } = useQuery(getUserFeed, {
    variables: { limit },
  })
  const userFeed = data && data.userFeed ? data.userFeed : {}

  const updateQuery = (
    { userFeed: received, ...rest },
    {
      subscriptionData: {
        data: { checkinAdded },
      },
    }
  ) => {
    const {
      user: { id: checkId },
    } = checkinAdded
    const { friends, id: ownId } = userInfo
    const inFriendList = [...friends, ownId].includes(checkId)
    // only update with own or friend's checkins
    return {
      userFeed: inFriendList ? [checkinAdded, ...received] : received,
    }
  }

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
          updateQuery,
        }),
    })
  )
}

UserFeedProvider.propTypes = propTypes
