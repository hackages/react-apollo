import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { BeerItem } from '../../core/BeerItem'
import { BeersContainer } from '../../styled/globalStyles'
import { BeerType } from '../../../types'

const propTypes = {
  onMount: PropTypes.func,
  beers: PropTypes.arrayOf(BeerType).isRequired,
}

export const DisplayBeers = ({ beers, onMount = () => { } }) => {
  useEffect(() => {
    onMount && onMount()
  }, [onMount])

  return (
    beers && (
      <BeersContainer>
        {beers.map(beer => (
          <BeerItem key={beer.id} beer={beer} />
        ))}
      </BeersContainer>
    )
  )
}

DisplayBeers.propTypes = propTypes
