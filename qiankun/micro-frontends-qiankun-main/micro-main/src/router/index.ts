import { useRoutes } from 'react-router-dom'
import mainRoutes from 'router/mainRoutes'

export default () => {
  return useRoutes([mainRoutes])
}