import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getRandomPic } from '../../utils'
import { AvatarBox } from '../styled/globalStyles'

const propTypes = {
  id: PropTypes.string.isRequired,
  big: PropTypes.bool,
}

const defaultProps = {
  big: false,
}

export const Avatar = ({ id, big }) => {
  const background = `url(${getRandomPic(id)}) no-repeat center/contain`

  return (
    <Link to={`/user/${id}`}>
      <AvatarBox big={big} style={{ background }} />
    </Link>
  )
}

Avatar.propTypes = propTypes
Avatar.defaultProps = defaultProps
