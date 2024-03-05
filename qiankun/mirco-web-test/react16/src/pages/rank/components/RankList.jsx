import React, { useState, useEffect } from "react";
import "./RankList.scss";
import globalConfig from "../../../config/globalConfig";
import axios from 'axios'

const RankList = () => {
  const [rankListData, setRankListData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/react16/car/type').then(res => {
      setRankListData(res.data)
    })
  }, [])

  return (
    <div className="rankList">
      {rankListData.map((rankItem) => {
        return (
          <div className="rankListItem">
            <div className="rankListItemLeft">
              <div className="rankListItemLeftRank">{rankItem.rank}</div>
              <img className="rankListItemLeftImage" src={`${globalConfig.baseUrl}${rankItem.image}`} />
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
