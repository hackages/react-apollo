import React from 'react'
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

export const Burger = ({ opened, onClick = () => {} }) => {
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

Burger.propTypes = propTypes
