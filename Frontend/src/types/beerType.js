import PropTypes from 'prop-types'
import CheckInType from './checkInType'

export default PropTypes.shape({
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