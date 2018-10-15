import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
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

export const BeerProvider = ({ id, detailed, children }) => (
  <Query query={getBeer} variables={{ id: id || random(), detailed }}>
    {({ loading, error, data }) =>
      !loading && !error && children({ loading, error, beer: data.beer })
    }
  </Query>
)

BeerProvider.propTypes = propTypes

BeerProvider.defaultProps = defaultProps
