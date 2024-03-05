import React, { useState, useEffect } from "react";
import globalConfig from "../../../config/globalConfig";
import "./NewCarList.scss"
import axios from 'axios'
const NewCarList = () => {
  const [newCarList, setNewCarList] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/react16/new/car').then(res => {
      setNewCarList(res.data)
    })
  }, [])
  return (
    <div className="newCar">
      {
        newCarList.length ? newCarList.map(newCar => {
          return (
            <div className="newCarItem">
              <img className="newCarItemImage" src={`${globalConfig.baseUrl}${newCar.image}`}/>
              <h2 className="newCarItemTitle">{newCar.title}</h2>
              <p className="newCarItemDate">{newCar.date}</p>
            </div>
          )
        }) : <div />
      }
    </div>
  )
}

export default NewCarList;
