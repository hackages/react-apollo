import { useQuery } from 'react-apollo'
import { getUser } from '../../../API/queries'

export const UserProvider = ({
  children,
  id,
  detailed = false,
  history = false,
}) => {
  const { loading, data } = useQuery(getUser, {
    variables: { id, detailed, history },
  })

  return !loading && data ? children({ user: data.user }) : null
}
