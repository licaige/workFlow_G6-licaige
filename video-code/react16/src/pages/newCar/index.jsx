import React from "react";
import "./index.scss";
import Calendar from "./components/Calendar.jsx";
import NewCarList from "./components/NewCarList.jsx";
import { useState } from 'react'

const NewCar = () => {
  const [] = useState()
  return (
    <div className="new-car-container">
      <div className="new-car-content">
        <Calendar/>
        <NewCarList/>
      </div>
    </div>
  )
}

export default NewCar;
