import React, { PureComponent } from 'react'
import {
  BurgerContainer,
  Burger as BurgerWrap,
  BurgerLineRight,
  BurgerLineMiddle,
  BurgerLineLeft,
} from '../styled/globalStyles.js'

export class Burger extends PureComponent {
  render() {
    const { opened, onClick } = this.props
    return (
      <BurgerContainer onClick={onClick}>
        <BurgerWrap>
          <BurgerLineRight open={opened} />
          <BurgerLineMiddle open={opened} />
          <BurgerLineLeft open={opened} />
        </BurgerWrap>
      </BurgerContainer>
    )
  }
}
