import React from 'react'
import { connect } from 'react-redux'
import { SNACK_LIFETIME } from '../../constants.js'
import {
  Snack as SnackContainer,
  SnackContent,
  SnackLoader,
  SnackDismiss,
} from '../styled/globalStyles.js'
import { clearSnack } from '../../store.js'

const _Snack = ({ snack, removeSnack }) => {
  const duration = SNACK_LIFETIME

  return (
    <SnackContainer>
      <SnackContent>
        <h4>{snack.type}</h4>
        <p>{snack.message}</p>
      </SnackContent>
      <SnackDismiss onClick={() => removeSnack(snack.id)}>DISMISS</SnackDismiss>
      <SnackLoader duration={duration}>
        <div> </div>
      </SnackLoader>
    </SnackContainer>
  )
}

export const Snack = connect(
  null,
  dispatch => ({
    removeSnack: payload => dispatch(clearSnack(payload)),
  })
)(_Snack)
