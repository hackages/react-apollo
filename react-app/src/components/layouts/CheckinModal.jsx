import React, { Component } from 'react'
import StarRating from 'react-star-rating-component'
import { connect } from 'react-redux'
import { Modal } from '../containers/Modal'
import { StyledForm } from '../styled/globalStyles'
import hackBeer from '../../assets/img/hackbeer.svg'
import { snack } from '../../store'
import { Mutation } from 'react-apollo'
import { checkIn } from '../../database/queries'

const initialState = {
  text: '',
  rating: 0,
}

export class _CheckinModal extends Component {
  state = initialState

  rate = rating => this.setState({ rating })

  changeText = ({ target: { value: text } }) => this.setState({ text })

  render() {
    const { snack, beer, showModal, toggleModal } = this.props
    const { text, rating } = this.state
    return (
      <Mutation
        mutation={checkIn}
        onCompleted={_ => {
          this.setState(initialState)
          snack([`Checked in to ${beer.name}`, 'success'])
          toggleModal()
        }}
        onError={err => {
          snack([`Wow`, 'error'])
          toggleModal()
        }}
      >
        {addCheckIn => (
          <Modal
            visible={showModal}
            onSubmit={() =>
              addCheckIn({
                variables: {
                  beer: beer.id,
                  rating,
                  text,
                },
              })
            }
            onCancel={toggleModal}
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
                      src={hackBeer}
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
    )
  }
}

export const CheckinModal = connect(
  null,
  dispatch => ({
    snack: payload => dispatch(snack(payload)),
  })
)(_CheckinModal)
