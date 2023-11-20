import React, { useState, useEffect } from "react";
import { getColors } from "../../utils";
import "./style.css";

const DoughnutChart = ({ data, filterState }) => {

  useEffect(() => {
    if (data) {
      const container = document.getElementById("donutChart");
      container.replaceChildren();

      const timePeriod = data.find((item) => item.period === filterState);

      if (!timePeriod) {
        console.error('Data for "ALL TIME" period not found.');
        return;
      }

      const numericValues = Object.values(timePeriod).filter(
        (value) => typeof value === "number"
      );
      const totalCount = numericValues.reduce((acc, value) => acc + value, 0);

      let startAngle = 0;

      Object.keys(timePeriod)
        .filter((key) => key !== "period")
        .map((value, index) => {
          const percentage = (timePeriod[value] / totalCount) * 100;

          const segmentElement = document.createElement("div");
          segmentElement.classList.add("portion-block");
          segmentElement.style.transform = `rotate(${startAngle}deg)`;
          segmentElement.style.background = getColors(index);

          startAngle += (percentage / 100) * 360;

          container.appendChild(segmentElement);
        });

      const centerDiv = document.createElement("div");
      centerDiv.classList.add("center");
      centerDiv.innerHTML = `$ ${totalCount}`;
      container.appendChild(centerDiv);
    }
  }, [data, filterState]);

  return (
    <div className="donut-chart-block block">
      <div className="donut-chart-block block">
        <div className="donut-chart" id="donutChart"></div>
      </div>
    </div>
  );
};

export default DoughnutChart;
