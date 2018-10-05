import React from 'react'
import { Link } from 'react-router-dom'
import { getRandomPic } from '../../utils'
import { AvatarBox } from '../styled/globalStyles'

export const Avatar = ({ id, big }) => {
  const background = `url(${getRandomPic(id)}) no-repeat center/contain`

  return (
    <Link to={`/user/${id}`}>
      <AvatarBox big={big} style={{ background }} />
    </Link>
  )
}
