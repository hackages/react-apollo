import React, { Component } from 'react'
import { CheckinItem } from '../dumb/CheckinItem'
import { Column, RatedBeer } from '../styled/globalStyles'

export class CheckinsList extends Component {
  componentDidMount = () => {
    const { onMount } = this.props
    onMount && onMount()
  }

  render() {
    const { checkins } = this.props
    return (
      <Column>
        {checkins.map(checkin => (
          <RatedBeer key={checkin.id}>
            <CheckinItem checkin={checkin} />
          </RatedBeer>
        ))}
      </Column>
    )
  }
}
