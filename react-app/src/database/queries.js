import gql from 'graphql-tag'

// QUERIES

export const getBeer = gql`
  query GetBeer($id: Int!, $detailed: Boolean!) {
    beer(id: $id) {
      id
      name
      tagline
      image_url
      average @include(if: $detailed)
      abv @include(if: $detailed)
      ibu @include(if: $detailed)
      description @include(if: $detailed)
      check_ins @include(if: $detailed) {
        user {
          username
          id
        }
        beer {
          name
          id
          average
        }
        rating
        createdAt
        text
        id
      }
    }
  }
`

export const getUser = gql`
  query GetUser($id: ID, $detailed: Boolean!, $history: Boolean!) {
    user(id: $id) {
      username
      id
      createdAt
      beer_history @include(if: $history) {
        beersHad
        uniqueBeersHad
        averageRating
      }
      friends {
        id
        username @include(if: $detailed)
      }
      check_ins @include(if: $detailed) {
        rating
        createdAt
        text
        id
        beer {
          name
          image_url
          id
          average
        }
        user {
          username
          id
        }
      }
    }
  }
`

export const getAllUsers = gql`
  query GetAllUsers($limit: Int) {
    users(limit: $limit) {
      id
      username
    }
  }
`

export const getCheckIn = gql`
  query GetCheckIn($id: ID) {
    checkin(id: $id) {
      beer {
        name
        tagline
        average
        abv
        ibu
        image_url
      }
      user {
        id
        username
      }
      id
      createdAt
      rating
    }
  }
`

export const getLatestCheckIns = gql`
  query GetLatestCheckIns($limit: Int, $onlyBeers: Boolean!) {
    checkins(limit: $limit) {
      id @skip(if: $onlyBeers)
      beer {
        name
        tagline
        id
        image_url
      }
      user @skip(if: $onlyBeers) {
        username
        id
      }
      rating @skip(if: $onlyBeers)
      createdAt @skip(if: $onlyBeers)
      text @skip(if: $onlyBeers)
    }
  }
`

export const getUserFeed = gql`
  query GetUserFeed($limit: Int) {
    userFeed(limit: $limit) {
      id
      beer {
        name
        tagline
        id
        image_url
      }
      user {
        username
        id
      }
      rating
      createdAt
      text
    }
  }
`

export const getBeers = gql`
  query GetBeers($limit: Int) {
    beers(limit: $limit) {
      id
    }
  }
`

// MUTATIONS

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

// SUBSCRIPTIONS

export const checkinSubscription = gql`
  subscription CheckInAdded($onlyBeers: Boolean!) {
    checkinAdded {
      id @skip(if: $onlyBeers)
      beer {
        name
        tagline
        id
        image_url
      }
      user @skip(if: $onlyBeers) {
        username
        id
      }
      rating @skip(if: $onlyBeers)
      createdAt @skip(if: $onlyBeers)
      text @skip(if: $onlyBeers)
    }
  }
`
