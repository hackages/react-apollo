import React, { PureComponent } from 'react'
import { BeerItem } from '../dumb/BeerItem'
import { BeersContainer } from '../styled/globalStyles'

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
