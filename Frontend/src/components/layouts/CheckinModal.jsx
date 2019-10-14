import React, { useState } from 'react'
import StarRating from 'react-star-rating-component'
import { connect } from 'react-redux'
import { Modal } from '../containers/Modal'
import { StyledForm } from '../styled/globalStyles'
import hackBeer from '../../assets/img/hackbeer.svg'
import { snack } from '../../store'
import { useMutation } from 'react-apollo'
import { checkIn } from '../../database/queries'

const initialState = {
  text: '',
  rating: 0,
}

const _CheckinModal = ({ snack, beer, showModal, toggleModal = () => {} }) => {
  const [text, settext] = useState(initialState.text)
  const [rating, setrating] = useState(initialState.rating)

  const [checkInM] = useMutation(checkIn)

  const addCheckIn = async () => {
    const { data, errors } = await checkInM({
      variables: {
        beer: beer.id,
        rating,
        text,
      },
    })

    if (errors) {
      snack([`Wow`, 'error'])
      toggleModal()
    } else if (data) {
      setrating(initialState.rating)
      settext(initialState.text)
      snack([`Checked in to ${beer.name}`, 'success'])
      toggleModal()
    }
  }

  const rate = rating => setrating(rating)

  const changeText = ({ target: { value: text } }) => settext(text)

  return (
    <Modal
      visible={showModal}
      onSubmit={() => addCheckIn()}
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
            onChange={changeText}
          />
          <StarRating
            name="rating"
            value={rating}
            onStarClick={rate}
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
  )
}

export const CheckinModal = connect(
  null,
  dispatch => ({
    snack: payload => dispatch(snack(payload)),
  })
)(_CheckinModal)
