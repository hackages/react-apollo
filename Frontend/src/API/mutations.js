import gql from "graphql-tag"

export const follow = gql`
  mutation Follow($id: ID!) {
    addFriend(id: $id) {
      id
      username
      friends {
        id
        username
      }
    }
  }
`

export const unfollow = gql`
  mutation Unfollow($id: ID!) {
    removeFriend(id: $id) {
      id
      username
      friends {
        id
        username
      }
    }
  }
`

export const checkIn = gql`
  mutation CheckInMutation($beer: Int!, $rating: Float, $text: String) {
    createCheckin(beer: $beer, rating: $rating, text: $text) {
      id
    }
  }
`

export const createUser = gql`
  mutation CreateUserMutation($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
      createdAt
    }
  }
`

export const signInUser = gql`
  mutation SignInUserMutation($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
      token
      user {
        id
        username
        friends {
          id
          username
        }
      }
    }
  }
`

// CLIENT

export const logIn = gql`
  mutation LogInMutation($userInfo: User!) {
    logIn(userInfo: $userInfo) @client {
      id
      username
      friends
    }
  }
`

export const logOut = gql`
  mutation LogOutMutation {
    logOut @client {
      id
      username
    }
  }
`

export const updateUser = gql`
  mutation UpdateUser($userInfo: User!) {
    updateUser(userInfo: $userInfo) @client {
      id
      username
      friends
    }
  }
`

export const addSnack = gql`
  mutation AddSnackMutation($type: String!, $message: String!) {
    addSnack(type: $type, message: $message) @client {
      id
    }
  }
`

export const removeSnack = gql`
  mutation removeSnackMutation($id: String!) {
    removeSnack(id: $id) @client {
      id
      message
      type
    }
  }
`