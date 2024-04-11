export default function animation(duration, from, to, onProgress) {
  const dis = to - from
  const speed = dis / duration
  const startTime = Date.now()
  let value = from;
  onProgress(value)

  function _run() {
    const now = Date.now()
    const time = now - startTime
    if (time >= duration) {
      value = to
      onProgress(value)
      return;
    }
    const d = time * speed
    value = from + d
    onProgress(value)
    requestAnimationFrame(_run)
  }
  requestAnimationFrame(_run)
}