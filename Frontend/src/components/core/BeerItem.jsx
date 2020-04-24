import React, { useState } from 'react'
import {
  StyledLink,
  ImageContainer,
  BeerContainer,
  BeerContent,
  StyledButton,
} from '../styled/globalStyles.js'
import { CheckinModal } from '../features/checkins/CheckinModal.jsx'
import { BeerType } from '../../types'
import { useAuth } from '../../store.js'

const propTypes = {
  beer: BeerType,
}

export const BeerItem = ({ beer }) => {
  const { loggedIn } = useAuth()
  const [showModal, setshowModal] = useState(false)

  const toggleModal = () => setshowModal(showModal => !showModal)

  return (
    <BeerContainer>
      <ImageContainer>
        <div
          className="image"
          id="beer-picture"
          style={{
            background: `url(${beer.image_url}) no-repeat center/contain`,
          }}
        />
      </ImageContainer>
      <BeerContent>
        <div className="header">
          <h4>{beer.name}</h4>
          <h6>{beer.tagline}</h6>
        </div>
        {loggedIn && (
          <div className="footer">
            <StyledLink to={`beer/${beer.id}`}>Details</StyledLink>
            <StyledButton onClick={toggleModal}> I'm having it</StyledButton>
          </div>
        )}
      </BeerContent>

      <CheckinModal
        toggleModal={toggleModal}
        showModal={showModal}
        beer={beer}
      />
    </BeerContainer>
  )
}

BeerItem.propTypes = propTypes
