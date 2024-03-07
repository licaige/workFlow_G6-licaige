export async function waitFor (cb: CallableFunction) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cb())
    }, 0)
  })
}
