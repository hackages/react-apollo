import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Query } from 'react-apollo'
import { getUser } from '../../database/queries'

const propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  detailed: PropTypes.bool,
  history: PropTypes.bool,
}

const defaultProps = {
  detailed: false,
  history: false,
}

export class UserProvider extends Component {
  render() {
    const { children, id, detailed, history } = this.props
    return (
      <Query query={getUser} variables={{ id, detailed, history }}>
        {({ loading, error, data }) =>
          !loading && data ? children({ user: data.user }) : null
        }
      </Query>
    )
  }
}

UserProvider.propTypes = propTypes
UserProvider.defaultProps = defaultProps
