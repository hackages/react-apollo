import React from 'react'
import { CheckinsProvider } from '../providers/CheckinsProvider'
import { DisplayBeers } from './DisplayBeers'
import { PaddingContainer } from '../styled/globalStyles'

export const LastBeers = () => (
  <CheckinsProvider onlyBeers limit={12}>
    {({ subscribeToMore, beers }) => (
      <PaddingContainer>
        <DisplayBeers onMount={subscribeToMore} beers={beers} />
      </PaddingContainer>
    )}
  </CheckinsProvider>
)
