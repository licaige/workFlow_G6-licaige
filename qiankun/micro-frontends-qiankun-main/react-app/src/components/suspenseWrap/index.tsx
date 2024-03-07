import { Suspense } from 'react'

const SuspenseWrap = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<div>loading...</div>}>
      <Component {...props} />
    </Suspense>
  )

export default SuspenseWrap