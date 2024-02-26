import React from "react";
import "./CarType.scss";

const CarType = () => {
  const carTypeList = [
    {
      name: '不限',
      type: 'all'
    },
    {
      name: '微型车',
      type: 'miniCar'
    },
    {
      name: '小型车',
      type: 'smallCar'
    },
    {
      name: '紧凑型车',
      type: 'compactCar'
    },
    {
      name: '中型车',
      type: 'midSizeCar'
    },
    {
      name: '中大型车',
      type: 'mediumAndLargeVehicles'
    },
    {
      name: '豪华车',
      type: 'luxuryCars'
    },
    {
      name: 'MPV',
      type: 'mpv'
    },
    {
      name: '微面',
      type: 'microvan'
    },
    {
      name: '皮卡',
      type: 'pickup'
    }
  ]

  let lastClickedDom;

  const handleClickType = (event) => {
    if (lastClickedDom) {
      lastClickedDom.classList.remove('carTypeClicked')
    }

    lastClickedDom = event.target;
    lastClickedDom.classList.add('carTypeClicked');
  }

  return (
    <div className="carType">
      <h1 className="carTypeTitle">按级别</h1>
      {
        carTypeList.map(carType => (
          <div className="carTypeItem" data-type={carType.type} onClick={handleClickType}>{carType.name}</div>
        ))
      }
    </div>
  )
}

export default CarType;