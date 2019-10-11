import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  StyledLink,
  ImageContainer,
  BeerContainer,
  BeerContent,
  StyledButton,
} from '../styled/globalStyles.js'
import { CheckinModal } from '../layouts/CheckinModal.jsx'
import { BeerType } from '../../types'

const propTypes = {
  beer: BeerType,
}

const _BeerItem = ({ beer, isLoggedIn }) => {
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
        {isLoggedIn && (
          <div className="footer">
            <StyledLink to={`beer/${beer.id}`}>Details</StyledLink>
            {true && (
              <StyledButton onClick={toggleModal}> I'm having it</StyledButton>
            )}
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

_BeerItem.propTypes = propTypes

export const BeerItem = connect(({ isLoggedIn }) => ({
  isLoggedIn,
}))(_BeerItem)
