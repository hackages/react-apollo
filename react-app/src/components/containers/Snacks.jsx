import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Snacks as SnacksContainer } from '../styled/globalStyles'
import { Snack } from '../dumb/Snack'

export class _Snacks extends Component {
  render() {
    const { snacks } = this.props
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
}

export const Snacks = connect(({ snacks }) => ({
  snacks,
}))(_Snacks)
