import React, { Component } from 'react'
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

class _Navbar extends Component {
  state = {
    opened: false,
  }

  logOut = () => {
    const { history, logOut } = this.props
    logOut()
    history.push('/')
  }

  toggleNav = () => this.setState(({ opened }) => ({ opened: !opened }))

  render() {
    const { opened } = this.state
    const { isLoggedIn, logOut, user } = this.props
    return isLoggedIn ? (
      <NavbarContainer>
        <Burger opened={opened} onClick={this.toggleNav} />
        <FlexRow open={opened}>
          <Link to="/feed">Home</Link>
          <Link to={`/user/${user.id}`}>Profile</Link>
        </FlexRow>
        <FlexRow open={opened}>
          <LinkStyledButton onClick={logOut}>Log Out</LinkStyledButton>
        </FlexRow>
      </NavbarContainer>
    ) : null
  }
}

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
