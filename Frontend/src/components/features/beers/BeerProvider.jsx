import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo'
import { getBeer } from '../../../API/queries'

const random = () => Math.floor(Math.random() * 160)

const propTypes = {
  id: PropTypes.string,
  detailed: PropTypes.bool,
  children: PropTypes.func.isRequired,
}

const defaultProps = {
  detailed: false,
}

export const BeerProvider = ({ id, detailed, children }) => {
  const beerId = useRef(id || random())
  const { data, loading, error } = useQuery(getBeer, {
    variables: { id: Number(beerId.current), detailed },
  })

  return (
    <div>
      {!loading && !error && children({ loading, error, beer: data.beer })}
    </div>
  )
}

BeerProvider.propTypes = propTypes
BeerProvider.defaultProps = defaultProps
