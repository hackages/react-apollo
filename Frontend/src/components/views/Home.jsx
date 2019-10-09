import React, { PureComponent } from 'react'
import { LastBeers } from '../containers/LastBeers'
import {
  StyledLink,
  HomeContainer,
  HomeButtonContainer,
} from '../styled/globalStyles'

export class Home extends PureComponent {
  render() {
    return (
      <HomeContainer>
        <HomeButtonContainer>
          <h1>Welcome on Hackbeer!</h1>

          <StyledLink
            to={{
              pathname: '/login',
              state: {
                login: true,
              },
            }}
          >
            Sign In
          </StyledLink>
          <StyledLink to="/login">Register</StyledLink>
        </HomeButtonContainer>
        <LastBeers />
      </HomeContainer>
    )
  }
}
