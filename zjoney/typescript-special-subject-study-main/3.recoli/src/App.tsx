import React from 'react';
import { atom, selector, useRecoilValue, useRecoilState } from './recoiljs';
import './App.css';
const textState = atom({
  key: 'textState', // 唯一标识
  default: '老数据', // 默认值
});
const charCountState = selector<string>({
  key: 'charCountState', // 唯一标识
  get: ({ get }) => {
    const text = get(textState);
    console.log('外部值', text);
    return text + '🏮';
  },
});
const App: React.FC = () => {
  const value = useRecoilValue(charCountState);
  const [text, setText] = useRecoilState(textState);
  const onClick = () => {
    console.log('点击执行');
    setText(Math.random().toString());
  };
  return (
    <>
      <h1>{value}</h1>
      <h2> {text}</h2>
      <button onClick={onClick}>修改数据</button>
    </>
  );
};
export default App;
