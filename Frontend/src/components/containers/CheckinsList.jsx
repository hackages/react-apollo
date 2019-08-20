import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CheckinItem } from '../dumb/CheckinItem'
import { Column, RatedBeer } from '../styled/globalStyles'
import { CheckInType } from '../../types'

const propTypes = {
  checkins: PropTypes.arrayOf(CheckInType).isRequired,
}
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

CheckinsList.propTypes = propTypes
