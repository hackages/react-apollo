import React, { useState } from 'react'
import StarRating from 'react-star-rating-component'
import { useMutation } from '@apollo/react-hooks'
import { Modal } from '../../core/Modal'
import { StyledForm } from '../../styled/globalStyles'
import hackBeer from '../../../assets/img/hackbeer.svg'
import { checkIn } from '../../../API/mutations'
import { useSnack } from '../../../store'

const initialState = {
  text: '',
  rating: 0,
}

export const CheckinModal = ({ beer, showModal, toggleModal = () => { } }) => {
  const [text, setText] = useState(initialState.text)
  const [rating, setRating] = useState(initialState.rating)

  const [checkInM] = useMutation(checkIn)
  const { addSnack } = useSnack()

  const addCheckIn = async () => {
    const { data, errors } = await checkInM({
      variables: {
        beer: beer.id,
        rating,
        text,
      },
    })

    if (errors) {
      addSnack('Wow', 'error')
      toggleModal()
    } else if (data) {
      setRating(initialState.rating)
      setText(initialState.text)
      addSnack(`Checked in to ${beer.name}`, 'success')
      toggleModal()
    }
  }

  const rate = rating => setRating(rating)

  const changeText = ({ target: { value: text } }) => setText(text)

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