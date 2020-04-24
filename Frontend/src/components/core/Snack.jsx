import React from 'react'
import { SNACK_LIFETIME } from '../../constants.js'
import {
  Snack as SnackContainer,
  SnackContent,
  SnackLoader,
  SnackDismiss,
} from '../styled/globalStyles.js'
import { useSnack } from '../../store.js'

export const Snack = ({ snack }) => {
  const { removeSnack } = useSnack()

  return (
    <SnackContainer>
      <SnackContent>
        <h4>{snack.type}</h4>
        <p>{snack.message}</p>
      </SnackContent>
      <SnackDismiss onClick={() => removeSnack(snack.id)}>DISMISS</SnackDismiss>
      <SnackLoader duration={SNACK_LIFETIME}>
        <div> </div>
      </SnackLoader>
    </SnackContainer>
  )
}
