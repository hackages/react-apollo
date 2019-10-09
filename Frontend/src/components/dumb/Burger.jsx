import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  BurgerContainer,
  Burger as BurgerWrap,
  BurgerLineRight,
  BurgerLineMiddle,
  BurgerLineLeft,
} from '../styled/globalStyles.js'

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
}

const defaultProps = {
  onClick: () => {},
}
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

Burger.propTypes = propTypes
Burger.defaultProps = defaultProps
