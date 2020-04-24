import React from 'react'
import { times } from 'ramda'
import { BeerProvider } from './BeerProvider'
import { BeerItem } from '../../core/BeerItem'
import { BeersContainer } from '../../styled/globalStyles'

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
