import React from "react";
import CarType from "./components/CarType.jsx";
import RankList from "./components/RankList.jsx";
import "./index.scss"

const Rank = () => {
  return (
    <div className="rank-container">
      <div className="rank-content">
        <CarType />
        <RankList />
      </div>
    </div>
  );
};

export default Rank;
