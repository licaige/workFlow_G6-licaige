import React from "react";
import "./RankList.scss";
import globalConfig from "../../../config/globalConfig";

const RankList = () => {
  const rankListData = [
    {
      rank: 1,
      image: `${globalConfig.baseUrl}/pic-car.png`,
      name: "奔驰GLC",
      price: "5.34-9.65万",
    },
    {
      rank: 2,
      image: `${globalConfig.baseUrl}/pic-car.png`,
      name: "别克GL6",
      price: "22.68-32.86万",
    },
    {
      rank: 3,
      image: `${globalConfig.baseUrl}/pic-car.png`,
      name: "途安L",
      price: "28.84-38.12万",
    },
    {
      rank: 4,
      image: `${globalConfig.baseUrl}/pic-car.png`,
      name: "朗逸",
      price: "6.23-10.92万",
    },
    {
      rank: 5,
      image: `${globalConfig.baseUrl}/pic-car.png`,
      name: "奥迪A4L",
      price: "24.67-40.21万",
    },
    {
      rank: 6,
      image: `${globalConfig.baseUrl}/pic-car.png`,
      name: "探歌",
      price: "4.15-6.23万",
    },
  ];

  return (
    <div className="rankList">
      {rankListData.map((rankItem) => {
        return (
          <div className="rankListItem">
            <div className="rankListItemLeft">
              <div className="rankListItemLeftRank">{rankItem.rank}</div>
              <img className="rankListItemLeftImage" src={rankItem.image} />
              <div className="rankListItemLeftInfo">
                <h1 className="rankListItemTitle">{rankItem.name}</h1>
                <h2 className="rankListItemSubtitle">厂商指导价：</h2>
                <p className="rankListItemPrice">{rankItem.price}</p>
              </div>
            </div>
            <div className="rankListItemRight">
              <div className="rankListItemRightTop">
                <span>参配</span>
                <span className="rankListItemRightTopSplit">|</span>
                <span>文章</span>
                <span className="rankListItemRightTopSplit">|</span>
                <span>视频</span>
                <span className="rankListItemRightTopSplit">|</span>
                <span>经销商</span>
              </div>
              <div className="rankListItemRightBottom">
                <div className="rankListItemRightBottomBuy">金融购车</div>
                <div className="rankListItemRightBottomPrice">询底价</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RankList;
