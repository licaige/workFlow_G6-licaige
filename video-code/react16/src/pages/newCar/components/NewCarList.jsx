import React from "react";
import globalConfig from "../../../config/globalConfig";
import "./NewCarList.scss"

const NewCarList = () => {
  const newCarList = [
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "哈佛H7",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "哈佛H8",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "汉兰达",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "奔驰GLC",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "本田CR-V",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "奕歌",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "途安L",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "别克GL8",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    },
    {
      image: `${globalConfig.baseUrl}/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    }
  ]
  return (
    <div className="newCar">
      {
        newCarList.map(newCar => {
          return (
            <div className="newCarItem">
              <img className="newCarItemImage" src={newCar.image}/>
              <h2 className="newCarItemTitle">{newCar.title}</h2>
              <p className="newCarItemDate">{newCar.date}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default NewCarList;