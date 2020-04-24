import React from 'react'
import { RandomBeers } from '../features/beers/RandomBeers'
import { UserFeedProvider } from '../features/users/UserFeedProvider'
import { CheckinsList } from '../features/checkins/CheckinsList'

export const Feed = () => (
  <div>
    <h1>Feed</h1>
    <div>
      <h2>Have you tried these beers?</h2>
      <RandomBeers />
    </div>
    <div>
      <h2>Had most recently</h2>
      <UserFeedProvider>
        {({ loading, error, userFeed, subscribeToMore }) =>
          !loading &&
          !error && (
            <CheckinsList onMount={subscribeToMore} checkins={userFeed} />
          )
        }
      </UserFeedProvider>
    </div>
  </div>
)
