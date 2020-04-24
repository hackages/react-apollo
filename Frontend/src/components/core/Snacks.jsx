import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Snacks as SnacksContainer } from '../styled/globalStyles'
import { Snack } from './Snack'
import { useSnack } from '../../store'

export const Snacks = () => {
  const { snacks } = useSnack()
  return (
    snacks && (
      <SnacksContainer>
        <TransitionGroup enter exit component={null}>
          {snacks.map(snack => (
            <CSSTransition
              classNames="list"
              timeout={{ exit: 500, enter: 0 }}
              key={snack.id}
            >
              <li>
                <Snack snack={snack} />
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </SnacksContainer>
    )
  )
}