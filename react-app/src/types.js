import PropTypes from 'prop-types'

export const BeerType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  image_url: PropTypes.string.isRequired,
  average: PropTypes.number,
  ibu: PropTypes.number,
  abv: PropTypes.number,
  description: PropTypes.string,
  check_ins: PropTypes.arrayOf(CheckInType),
})

export const UserType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  beer_history: PropTypes.shape({
    beersHad: PropTypes.number,
    uniqueBeersHad: PropTypes.number,
    averageRating: PropTypes.number,
  }),
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string,
    })
  ),
})

export const CheckInType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  rating: PropTypes.number,
  beer: BeerType,
  user: UserType,
})

export const SnackType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
})
