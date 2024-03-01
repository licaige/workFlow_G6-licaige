import React, { useEffect, useState } from "react";
import "./useCountdown.scss"

const COUNTDOWN_SECONDS = 60;

const Countdown = () => {
  const [ timing, setTiming ] = useState(false);
  const [ second, setSecond ] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    let interval
    // 开始倒计时
    if (timing) {
      interval = setInterval(() => {
        setSecond(preSecond => {
          if (preSecond <= 1) {
            setTiming(false)
            clearInterval(interval)
            // 重置秒数
            return COUNTDOWN_SECONDS
          } else {
            return preSecond - 1
          }
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timing])

  return (
    <div className="container">
      <button className={`button ${timing ? 'buttonDisabled' : ''}`} disabled={timing} onClick={() => setTiming(true)}>
        {timing ? `${second} 秒` : '获取动态码'}
      </button>
    </div>
  )
}

export default Countdown;