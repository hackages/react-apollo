import React from 'react'
import { BeerProvider } from '../providers/BeerProvider'
import { BeerItem } from '../dumb/BeerItem'
import { BeersContainer } from '../styled/globalStyles'
import { times } from 'ramda'

export const RandomBeers = () => (
  <BeersContainer>
    {times(
      num => (
        <BeerProvider key={num}>
          {({ beer, loading }) =>
            !loading && <BeerItem key={beer.id} beer={beer} />
          }
        </BeerProvider>
      ),
      6
    )}
  </BeersContainer>
)
