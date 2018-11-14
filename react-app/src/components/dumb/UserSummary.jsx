import React, { Component } from 'react'
import {
  SidebarInfos,
  SidebarInfosBox,
  InfosBold,
} from '../styled/globalStyles'
import { UserType } from '../../types'

const propTypes = {
  user: UserType,
}

export class UserSummary extends Component {
  render() {
    const {
      user: { beer_history, friends },
    } = this.props
    return (
      beer_history && (
        <SidebarInfos>
          <SidebarInfosBox>
            <InfosBold>{beer_history.beersHad}</InfosBold>
            beers had
          </SidebarInfosBox>

          <SidebarInfosBox>
            <InfosBold>{beer_history.uniqueBeersHad}</InfosBold>
            unique beers had
          </SidebarInfosBox>

          <SidebarInfosBox>
            <InfosBold>{beer_history.averageRating}</InfosBold>
            average rating
          </SidebarInfosBox>

          <SidebarInfosBox>
            <InfosBold>{friends.length}</InfosBold>
            follows
          </SidebarInfosBox>
        </SidebarInfos>
      )
    )
  }
}

UserSummary.propTypes = propTypes
