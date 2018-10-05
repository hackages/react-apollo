import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkIn } from '../../database/queries.js'
import {
  StyledLink,
  ImageContainer,
  BeerContainer,
  BeerContent,
  StyledButton,
  StyledForm,
} from '../styled/globalStyles.js'
import { Modal } from '../containers/Modal'
import StarRating from 'react-star-rating-component'
import { Mutation } from 'react-apollo'
import HackBeer from '../../assets/img/hackbeer.svg'
import { snack } from '../../store.js'

const initialState = {
  showModal: false,
  text: '',
  rating: 0,
}

export class _BeerItem extends PureComponent {
  static propTypes = {
    beer: PropTypes.shape({
      name: PropTypes.string,
      tagline: PropTypes.string,
      id: PropTypes.number,
    }),
  }

  state = initialState

  rate = rating => this.setState({ rating })

  changeText = ({ target: { value: text } }) => this.setState({ text })

  toggleModal = () =>
    this.setState(({ showModal }) => ({ showModal: !showModal }))

  render() {
    const { beer, snack } = this.props
    const { text, rating, showModal } = this.state
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

        <Mutation mutation={checkIn}>
          {addCheckIn => (
            <Modal
              visible={showModal}
              onSubmit={() => {
                addCheckIn({
                  variables: {
                    beer: beer.id,
                    rating,
                    text,
                  },
                })
                this.setState(initialState)
                snack([`Checked in to ${beer.name}`, 'success'])
              }}
              onCancel={this.toggleModal}
            >
              <h3 slot="header">You're going to check in to {beer.name}</h3>
              <div slot="body">
                <StyledForm action="">
                  <label htmlFor="textarea">Write something :</label>
                  <textarea
                    name="text"
                    id="textarea"
                    value={text}
                    onChange={this.changeText}
                  />
                  <StarRating
                    name="rating"
                    value={rating}
                    onStarClick={this.rate}
                    renderStarIcon={(index, value) => (
                      <img
                        alt="Beer Cap Rating"
                        src={HackBeer}
                        style={{
                          height: '56px',
                          opacity: index <= value ? 1 : 0.5,
                        }}
                      />
                    )}
                  />
                </StyledForm>
              </div>
            </Modal>
          )}
        </Mutation>
      </BeerContainer>
    )
  }
}

export const BeerItem = connect(
  null,
  dispatch => ({
    snack: payload => dispatch(snack(payload)),
  })
)(_BeerItem)
