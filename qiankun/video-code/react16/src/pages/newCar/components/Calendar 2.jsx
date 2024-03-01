import React from "react";
import "./Calendar.scss";

const Calendar = () => {
  const genRangeMonth = (size, startAt = 1) => {
    return [...Array(size).keys()].map(i => i + startAt).reverse();
  }

  let lastClickedDom;

  const handleClickMonth = (event) => {
    if (lastClickedDom) {
      lastClickedDom.classList.remove('calendarClicked')
    }

    lastClickedDom = event.target;
    lastClickedDom.classList.add('calendarClicked');
  }

  const currentFullYear = new Date().getFullYear();
  const currentYearMonthList = genRangeMonth(new Date().getMonth() + 1);
  const lastYearMonthList = genRangeMonth(12);

  return (
    <div className="calendar">
      <h1 className="calendarTitle">日历</h1>
      <h2 className="calendarYear">{currentFullYear}年</h2>
      {
        currentYearMonthList.map(month => (
          <div key={`${currentFullYear}-month`} className="calendarMonth" onClick={handleClickMonth}>{month}月</div>
        ))
      }
      <h2 className="calendarYear">{currentFullYear - 1}年</h2>
      {
        lastYearMonthList.map(month => (
          <div key={`${currentFullYear - 1}-month`} className="calendarMonth" onClick={handleClickMonth}>{month}月</div>
        ))
      }
    </div>
  );
}

export default Calendar;