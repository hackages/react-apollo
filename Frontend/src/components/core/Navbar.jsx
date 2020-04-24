import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import {
  NavbarContainer,
  LinkStyledButton,
  FlexRow,
} from '../styled/globalStyles.js'
import { Burger } from './Burger'
import { useAuth } from '../../store.js'

const propTypes = {
  history: PropTypes.object
}

const _Navbar = ({ history }) => {
  const { loggedIn, userInfo, signOut } = useAuth()
  const [opened, setOpened] = useState(false)

  const logUserOut = () => {
    signOut()
    history.push('/')
  }

  const toggleNav = () => setOpened(opened => !opened)

  return loggedIn ? (
    <NavbarContainer>
      <Burger opened={opened} onClick={toggleNav} />
      <FlexRow open={opened}>
        <Link to="/feed">Home</Link>
        <Link to={`/user/${userInfo.id}`}>Profile</Link>
      </FlexRow>
      <FlexRow open={opened}>
        <LinkStyledButton onClick={logUserOut}>Log Out</LinkStyledButton>
      </FlexRow>
    </NavbarContainer>
  ) : null
}

_Navbar.propTypes = propTypes

export const Navbar = compose(
  withRouter
)(_Navbar)
