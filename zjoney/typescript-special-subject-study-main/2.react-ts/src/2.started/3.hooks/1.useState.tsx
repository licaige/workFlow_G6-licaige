import { useState } from 'react';
//=======1.通过泛型设置我们的状态=======
type IUser = {
  username: string;
};
const App = () => {
  const [val, toggle] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  // later...
  //   setUser(newUser);
  console.log(user);
  console.log(val);
};

console.log('App: ', App);

// =======2.通过泛型设置我们的状态keyof typeof =======
// interface A {
//   count: number;
// }
// const results = '222';
