import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { path } from 'ramda'
import { CheckinModal } from '../features/checkins/CheckinModal'
import { BeerProvider } from '../features/beers/BeerProvider'
import { CheckinItem } from '../core/CheckinItem'
import {
  ProfileHeader,
  HeaderContainer,
  ImageContainer,
  TextHeaderContainer,
  HeaderUsername,
  StyledButton,
  Row,
  Column,
  SidebarInfos,
  SidebarInfosBox,
  InfosBold,
} from '../styled/globalStyles'

const _BeerDetails = (props) => {
  const id = path(['match', 'params', 'id'], props)
  const [showModal, setshowModal] = useState(false)
  const toggleModal = () => setshowModal(modal => !modal)

  return (
    <div>
      <BeerProvider detailed id={id}>
        {({ beer }) => (
          <ProfileHeader>
            <Fragment>
              <HeaderContainer>
                <ImageContainer checkin>
                  <div
                    style={{
                      background: `url(${beer.image_url}) no-repeat center/contain`,
                    }}
                  />
                </ImageContainer>
                <TextHeaderContainer>
                  <HeaderUsername>{beer.name}</HeaderUsername>
                  <h4>{beer.tagline}</h4>
                  <p>{beer.description}</p>
                  <StyledButton little onClick={toggleModal}>
                    checkin
                  </StyledButton>
                </TextHeaderContainer>
              </HeaderContainer>

              {beer.check_ins && (
                <div className="lastUsers">
                  <h4>Last checked by</h4>
                  <Row>
                    <Column>
                      {beer.check_ins.map(checkin => (
                        <li key={checkin.id}>
                          <CheckinItem checkin={checkin} />
                        </li>
                      ))}
                    </Column>

                    <SidebarInfos>
                      <SidebarInfosBox>
                        <InfosBold>{beer.average}</InfosBold>
                        Average Rating
                      </SidebarInfosBox>
                      <SidebarInfosBox>
                        <InfosBold>{beer.ibu}</InfosBold>
                        IBU (bitterness rating)
                      </SidebarInfosBox>
                      <SidebarInfosBox>
                        <InfosBold>{beer.abv}</InfosBold>
                        ABV
                      </SidebarInfosBox>
                      <SidebarInfosBox>
                        <InfosBold>nope</InfosBold>
                        Loyal Drinker
                      </SidebarInfosBox>
                    </SidebarInfos>
                  </Row>
                </div>
              )}

              <CheckinModal
                toggleModal={toggleModal}
                showModal={showModal}
                beer={beer}
              />
            </Fragment>
          </ProfileHeader>
        )}
      </BeerProvider>
    </div>
  )
}

export const BeerDetails = compose(
  withRouter,
)(_BeerDetails)
