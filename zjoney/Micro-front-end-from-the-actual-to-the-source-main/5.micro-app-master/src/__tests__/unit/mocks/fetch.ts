export function setupMockFetch (data: string, error?: boolean) {
  return function fetchStub () {
    return error
      ? Promise.reject(new Error('network error'))
      : Promise.resolve({
        text: () => data,
      })
  }
}
