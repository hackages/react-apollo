import React, { Fragment } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { contains, path } from 'ramda'
import { useMutation } from '@apollo/react-hooks'
import { UserProvider } from '../features/users/UserProvider'
import { CheckinsList } from '../features/checkins/CheckinsList'
import { UserSummary } from '../core/UserSummary'
import { Avatar } from '../core/Avatar'
import {
  ProfileHeader,
  Row,
  TextHeaderContainer,
  HeaderContainer,
  HeaderUsername,
  FollowButton,
} from '../styled/globalStyles'
import { ago } from '../../utils'
import { useSnack, useAuth } from '../../store'
import { unfollow, follow } from '../../API/mutations'

const _UserDetails = (props) => {
  const { updateUser, userInfo } = useAuth()
  const {addSnack} = useSnack()
  const id =  path(['match', 'params', 'id'], props)
  const isFriends = contains(
    id,
    userInfo.friends.map(({id}) => id)
    )
  const isSelf = id === userInfo.id
  const [toggleFollowM] = useMutation(isFriends ? unfollow : follow)

  const toggleFollow = async vars => {
    const { data, errors } = await toggleFollowM(vars)

    if (errors) {
      addSnack(`Wow`, 'error')
    } else if (data) {
      const { addFriend, removeFriend } = data
      updateUser(addFriend || removeFriend)
      addSnack(!isFriends ? 'Made a new friend 😃' : `You're no longer friends 😿`)
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
  withRouter
)(_UserDetails)
