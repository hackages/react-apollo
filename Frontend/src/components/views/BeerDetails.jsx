import React, { Fragment, useState } from 'react'
import { path } from 'ramda'
import { BeerProvider } from '../providers/BeerProvider'
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
import { CheckinItem } from '../dumb/CheckinItem'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { snack } from '../../store'
import { CheckinModal } from '../layouts/CheckinModal'

const _BeerDetails = ({ id }) => {
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
  connect(
    (state, ownProps) => ({
      id: path(['match', 'params', 'id'], ownProps),
    }),
    dispatch => ({
      snack: payload => dispatch(snack(payload)),
    })
  )
)(_BeerDetails)
