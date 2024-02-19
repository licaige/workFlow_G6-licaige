export function MockForwardRef<T, P = object>(renderFn: {
  (props: P, ref: { current: T }): string
}): {
  (props: P & { current: T }): string
} {
  return (props: P & { current: T }) => {
    return renderFn(props, { current: props.current })
  }
}

const mockForwardRefInstance = MockForwardRef<string, { name: 'wsz' }>(({ name }, ref) => {
  return 'sss'
})

const mockForwardRefInstanceRes = mockForwardRefInstance({ name: 'wsz', current: 'sss' })

const MockForwardRef11 = <T, P = { name: string }>(props: P, ref: { current: T }): string => {
  return 'sss'
}
export function MockForwardRef11Ts<T, P = { name: string }>(props: P, ref: { current: T }): string {
  return 'sss'
}

const aa = <T>(name: T, ref: { current: T }): boolean => {
  return !!name
}
function aaa<T>(name: T): boolean {
  return !!name
}