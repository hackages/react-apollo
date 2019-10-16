import { PropTypes } from 'prop-types'
import { getUserFeed, checkinSubscription } from '../../database/queries'
import { useQuery } from 'react-apollo'
import { connect } from 'react-redux'
import { getUser } from '../../store'

const propTypes = {
  limit: PropTypes.number,
}

const _UserFeedProvider = ({ limit = 18, user, children }) => {
  const { subscribeToMore, loading, error, data } = useQuery(getUserFeed, {
    variables: { limit },
  })
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
          updateQuery: (
            { userFeed: received },
            {
              subscriptionData: {
                data: { checkinAdded },
              },
            }
          ) => {
            const {
              user: { id: checkId },
            } = checkinAdded
            const { friends, id: ownId } = user
            const inFriendList = [...friends, ownId].includes(checkId)
            // only update with own or friend's checkins
            return {
              userFeed: inFriendList ? [checkinAdded, ...received] : received,
            }
          },
        }),
    })
  )
}

_UserFeedProvider.propTypes = propTypes

export const UserFeedProvider = connect(state => ({
  user: getUser(state),
}))(_UserFeedProvider)
