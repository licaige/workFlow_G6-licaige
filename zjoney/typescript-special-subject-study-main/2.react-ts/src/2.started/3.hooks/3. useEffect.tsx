import { useEffect } from 'react';
function DelayedEffect(props: { timerMs: number }) {
  const { timerMs } = props;
  //一定要注意JS的默认的值 意向不到的返回值
  useEffect(() => {
    setTimeout(() => {
      /* do stuff */
    }, timerMs);
  }, [timerMs]);
  return null;
}
console.log('DelayedEffect: ', DelayedEffect);
