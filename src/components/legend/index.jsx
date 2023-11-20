import React from "react";
import {getColors} from '../../utils'
import './style.css'


const Legend = ({data, filterState}) => {

  if(!data) {
    return null;
  }

  const timePeriod = data.find((item) => item.period === filterState);

  return (
    <div className="legend-wrapper">
      {Object.keys(timePeriod)
        .filter((key) => key !== "period")
        .map((value, index) => {
          return <div className="legend-items">
            <div className="color-box" style={{backgroundColor: getColors(index)}}></div>
            <p>{value}</p>
          </div>;
        })}
    </div>
  );
};

export default Legend;
