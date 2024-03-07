import { lazy } from 'react'
import { SuspenseWrap } from 'components'

export const HomeComponent = SuspenseWrap(lazy(() => import('pages/home')))
