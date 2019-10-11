import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  NavbarContainer,
  LinkStyledButton,
  FlexRow,
} from '../styled/globalStyles.js'
import { Burger } from './Burger'
import { logout } from '../../store.js'

const propTypes = {
  logOut: PropTypes.func.isRequired,
}

const _Navbar = ({ logOut, isLoggedIn, user, history }) => {
  const [opened, setopened] = useState(false)

  const logUserOut = () => {
    logOut()
    history.push('/')
  }

  const toggleNav = () => setopened(opened => !opened)

  return isLoggedIn ? (
    <NavbarContainer>
      <Burger opened={opened} onClick={toggleNav} />
      <FlexRow open={opened}>
        <Link to="/feed">Home</Link>
        <Link to={`/user/${user.id}`}>Profile</Link>
      </FlexRow>
      <FlexRow open={opened}>
        <LinkStyledButton onClick={logUserOut}>Log Out</LinkStyledButton>
      </FlexRow>
    </NavbarContainer>
  ) : null
}

_Navbar.propTypes = propTypes

export const Navbar = compose(
  withRouter,
  connect(
    state => ({
      isLoggedIn: state.isLoggedIn,
      user: state.userInfo,
    }),
    dispatch => ({
      logOut: () => dispatch(logout()),
    })
  )
)(_Navbar)
