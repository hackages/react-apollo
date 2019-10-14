import React, { Fragment } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { contains, path } from 'ramda'
import { UserProvider } from '../providers/UserProvider'
import {
  ProfileHeader,
  Row,
  TextHeaderContainer,
  HeaderContainer,
  HeaderUsername,
  FollowButton,
} from '../styled/globalStyles'
import { Avatar } from '../dumb/Avatar'
import { ago } from '../../utils'
import { CheckinsList } from '../containers/CheckinsList'
import { UserSummary } from '../dumb/UserSummary'
import { setUserInfo, snack } from '../../store'
import { useMutation } from 'react-apollo'
import { unfollow, follow } from '../../database/queries'

const _UserDetails = ({ isFriends, isSelf, id, snack, setUserInfo }) => {
  const [toggleFollowM] = useMutation(isFriends ? unfollow : follow)

  const toggleFollow = async vars => {
    const { data, errors } = await toggleFollowM(vars)

    if (errors) {
      snack([`Wow`, 'error'])
    } else if (data) {
      const { addFriend, removeFriend } = data
      setUserInfo(addFriend || removeFriend)
      snack([
        !isFriends ? 'Made a new friend 😃' : `You're no longer friends 😿`,
        'success',
      ])
    }
  }

  return (
    <div>
      <UserProvider detailed history id={id}>
        {({ user }) => (
          <Fragment>
            <ProfileHeader>
              <HeaderContainer>
                <Avatar big id={user.id} />
                <TextHeaderContainer>
                  <div>
                    <HeaderUsername>{user.username}</HeaderUsername>
                    <span>joined {ago(user.createdAt)}</span>
                  </div>
                  {isSelf ? (
                    <h3>
                      It's you!{' '}
                      <span role="img" aria-label="cheers">
                        🍻
                      </span>
                    </h3>
                  ) : (
                    <FollowButton
                      onClick={() => toggleFollow({ variables: { id } })}
                      isFollowed={isFriends}
                    >
                      {' '}
                      {isFriends ? 'Unfollow' : 'Follow'}{' '}
                    </FollowButton>
                  )}
                </TextHeaderContainer>
              </HeaderContainer>
            </ProfileHeader>
            <Row>
              {user.check_ins && <CheckinsList checkins={user.check_ins} />}
              <UserSummary user={user} />
            </Row>
          </Fragment>
        )}
      </UserProvider>
    </div>
  )
}

export const UserDetails = compose(
  withRouter,
  connect(
    ({ userInfo }, ownProps) => ({
      id: path(['match', 'params', 'id'], ownProps),
      isFriends: contains(
        path(['match', 'params', 'id'], ownProps),
        userInfo.friends
      ),
      isSelf: path(['match', 'params', 'id'], ownProps) === userInfo.id,
    }),
    dispatch => ({
      snack: payload => dispatch(snack(payload)),
      setUserInfo: payload => dispatch(setUserInfo(payload)),
    })
  )
)(_UserDetails)
