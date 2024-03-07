import React, { useRef } from 'react';
export function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  // infers [boolean, typeof load] instead of (boolean | typeof load)[]
  return [isLoading, load] as const;
}

// const x : keyof any = "xx";
// const [isLoading] = useLoading();

// const App = () => {
//   const [isLoading] = useLoading();
//   console.log('xx: ', isLoading);
// };
// console.log('App: ', App);

// export function useLoading() {
//   const [isLoading, setState] = React.useState(false);
//   const load = (aPromise: Promise<any>) => {
//     setState(true);
//     return aPromise.finally(() => setState(false));
//   };
//   return [isLoading, load] as [
//     boolean,
//     (aPromise: Promise<any>) => Promise<any>
//   ];
// }

const App = () => {
  //收集很多的TS小技巧
  function tuplify<T extends any[]>(...elements: T) {
    return elements;
  }

  function useArray() {
    const numberValue = useRef(3).current;
    const functionValue = useRef(() => {}).current;
    return [numberValue, functionValue]; // type is (number | (() => void))[]
  }

  function useTuple() {
    const numberValue = useRef(3).current;
    const functionValue = useRef(() => {}).current;
    return tuplify(numberValue, functionValue); // type is [number, () => void]
  }
};
