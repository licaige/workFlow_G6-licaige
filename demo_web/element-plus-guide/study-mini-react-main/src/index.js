import React, {Component, useReducer, useEffect, useLayoutEffect} from "react";
import ReactDOM from "react-dom";
// import ReactDOM from "./kreact/react-dom";
// import Component from "./kreact/Component";
// import { useReducer, useEffect, useLayoutEffect } from "./creact-5-18-mini-reconciler/react";
// import ReactDOM from "./creact-5-18-mini-reconciler/react-dom";
import "./index.css";
// 凌晨一点
function FunctionComponent({name}) {
    const [count1, setCount1] = useReducer(x => x + 1, 0)
    const [count2, setCount2] = useReducer(x => x + 1, 1)
    let a = 'aaa'
    let b = 'bbb'
    useEffect(() => {
        console.log('useEffect', count2)
        b = ''
    }, [count2])

    useLayoutEffect(() => {
        a = 'xxxx'
        console.log('useLayoutEffect', count2)
    }, [count2])


    return (
      <div className="border">
        <p>{name}</p>
        <button onClick={() => setCount1()}>{count1}==={a}</button>
        <button onClick={() => setCount2()}>{count2}==={b}</button>
        <ul>
            <li key="0">0</li>
            <li key="1">1</li>
            {count2 % 2 ? <li key="2">2</li> : null}
            <li key="3">3</li>
            <li key="4">4</li>
        </ul>
      </div>
    );
}

function FC() {
    const [count, setCount] = useReducer(x => x + 1, 1)
    return(
        <>
            <h1>coboy</h1>
            <h2>cobyte</h2>
            <button onClick={() => setCount()}>{count}</button>
        </>
    )
}

const jsx = (
  <div className="border">
    <h1>coboy</h1>
    <a href="https://www.amebyte.com/">amebyte</a>
    <FunctionComponent name="coboy" />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log
