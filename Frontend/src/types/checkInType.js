import PropTypes from 'prop-types'
import UserType from './userType'
import BeerType from './beerType'

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  rating: PropTypes.number,
  beer: BeerType,
  user: UserType,
})