import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo'
import { getBeer } from '../../database/queries'

const random = () => Math.round(Math.random() * 160) + ''

const propTypes = {
  id: PropTypes.string,
  detailed: PropTypes.bool,
  children: PropTypes.func.isRequired,
}

const defaultProps = {
  id: undefined,
  detailed: false,
}

export const BeerProvider = ({ id, detailed, children }) => {
  const { data, loading, error } = useQuery(getBeer, {
    variables: { id: Number(id) || Number(random()), detailed },
  })

  return (
    <div>
      {!loading && !error && children({ loading, error, beer: data.beer })}
    </div>
  )
}

BeerProvider.propTypes = propTypes

BeerProvider.defaultProps = defaultProps
