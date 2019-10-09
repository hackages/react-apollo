import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { BeerItem } from '../dumb/BeerItem'
import { BeersContainer } from '../styled/globalStyles'
import { BeerType } from '../../types'

const propTypes = {
  onMount: PropTypes.func,
  beers: PropTypes.arrayOf(BeerType).isRequired,
}

const defaultProps = {
  onMount: () => {},
}
export class DisplayBeers extends PureComponent {
  componentDidMount() {
    const { onMount } = this.props
    onMount && onMount()
  }

  render() {
    const { beers } = this.props
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
}

DisplayBeers.propTypes = propTypes
DisplayBeers.defaultProps = defaultProps
