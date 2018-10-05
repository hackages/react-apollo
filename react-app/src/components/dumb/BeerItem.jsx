import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  StyledLink,
  ImageContainer,
  BeerContainer,
  BeerContent,
  StyledButton,
} from '../styled/globalStyles.js'
import { CheckinModal } from '../layouts/CheckinModal.jsx'

export class BeerItem extends PureComponent {
  static propTypes = {
    beer: PropTypes.shape({
      name: PropTypes.string,
      tagline: PropTypes.string,
      id: PropTypes.number,
    }),
  }

  state = {
    showModal: false,
  }

  toggleModal = () =>
    this.setState(({ showModal }) => ({ showModal: !showModal }))

  render() {
    const { beer } = this.props
    const { showModal } = this.state
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
          <div className="footer">
            <StyledLink to={`beer/${beer.id}`}>Details</StyledLink>
            {true && (
              <StyledButton onClick={this.toggleModal}>
                {' '}
                I'm having it
              </StyledButton>
            )}
          </div>
        </BeerContent>

        <CheckinModal
          toggleModal={this.toggleModal}
          showModal={showModal}
          beer={beer}
        />
      </BeerContainer>
    )
  }
}
