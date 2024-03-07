const [state, setState] = React.useState({
  foo: 1,
  bar: 2,
}); //推断出的状态 {foo: number, bar: number}

//不建议这么用 但是Partial可以用起来
const partialStateUpdate = (obj: Partial<typeof state>) =>
  setState({ ...state, ...obj });

partialStateUpdate({ foo: 2 }); // this works
