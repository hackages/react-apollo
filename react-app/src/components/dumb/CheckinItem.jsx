import React from 'react'
import { Link } from 'react-router-dom'
import {
  RatedBeerContainer,
  UserInfo,
  ImageContainer,
  BeerInfo,
} from '../styled/globalStyles'
import { Avatar } from './Avatar'
import { ago } from '../../utils'
import { CheckInType } from '../../types'

const propTypes = {
  checkin: CheckInType,
}

export const CheckinItem = ({
  checkin: { user, beer, rating, text, createdAt },
}) => (
  <RatedBeerContainer>
    <div className="header">
      <Avatar class="profile-picture" id={user.id} />
      <UserInfo>
        <p>{user.username}</p>
        <span>{ago(createdAt)}</span>
      </UserInfo>
    </div>
    <div className="body">
      <Link to={`/beer/${beer.id}`}>
        <ImageContainer checkin>
          <div
            style={{
              background: `url(${beer.image_url}) no-repeat center/contain`,
            }}
          />
        </ImageContainer>
      </Link>
      <BeerInfo>
        <h5>{beer.name}</h5>
        <p>Rating: {rating}</p>
        <div>
          &#171; {text}
          &#187;{' '}
        </div>
      </BeerInfo>
    </div>
  </RatedBeerContainer>
)

CheckinItem.propTypes = propTypes
