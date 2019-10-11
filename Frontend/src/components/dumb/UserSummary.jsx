import React from 'react'
import {
  SidebarInfos,
  SidebarInfosBox,
  InfosBold,
} from '../styled/globalStyles'

export const UserSummary = ({ user: { beer_history, friends } }) => {
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
