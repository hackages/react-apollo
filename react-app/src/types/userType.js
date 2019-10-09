import PropTypes from 'prop-types'


export default PropTypes.shape({
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