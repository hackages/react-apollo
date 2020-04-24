import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { CheckinItem } from '../../core/CheckinItem'
import { Column, RatedBeer } from '../../styled/globalStyles'
import { CheckInType } from '../../../types'

const propTypes = {
  checkins: PropTypes.arrayOf(CheckInType).isRequired,
}

export const CheckinsList = ({ onMount, checkins }) => {
  useEffect(() => {
    onMount && onMount()
  }, [onMount])

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

CheckinsList.propTypes = propTypes
