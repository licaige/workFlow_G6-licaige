// import React, {Component} from "react";
// import ReactDOM from "react-dom";
// import ReactDOM from "./kreact/react-dom";
// import Component from "./kreact/Component";
// import { useEffect, useLayoutEffect } from 'react/cjs/react.production.min';
import {useReducer, useEffect, useLayoutEffect} from './creact/react'
import ReactDOM from "./creact/react-dom";
import "./index.css";

function FunctionComponent({name}) {
    const [count1, setCount1] = useReducer(x => x + 1, 0)
    const [count2, setCount2] = useReducer(x => x + 1, 1)

    useEffect(() => {
        console.log('useEffect', count2)
    }, [count2])

    useLayoutEffect(() => {
        console.log('useLayoutEffect', count2)
    }, [count2])

    return (
      <div className="border">
        <p>{name}</p>
        <button onClick={() => setCount1()}>{count1}</button>
        <button onClick={() => setCount2()}>{count2}</button>
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
    return(
        <>
            <h1>coboy</h1>
            <h2>cobyte</h2>
        </>
    )
}

const jsx = (
  <div className="border">
    <h1>coboy</h1>
    <a href="https://www.amebyte.com.com/">amebyte</a>
    <FunctionComponent name="Function" />
    {/* <FC /> */}
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log
