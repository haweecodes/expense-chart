import React, { useState, useEffect } from "react";
import "./style.css";

const data = [
  {
    period: "1M",
    personal: 150,
    shopping: 90,
    phone: 60,
    other: 80,
  },
  {
    period: "6M",
    personal: 320,
    shopping: 240,
    phone: 255,
    other: 298,
  },
  {
    period: "1Y",
    personal: 950,
    shopping: 930,
    phone: 738,
    other: 490,
  },
  {
    period: "ALL TIME",
    personal: 25,
    shopping: 25,
    phone: 25,
    other: 25,
  },
];

const DoughnutChart = () => {
  const color = ["#4c49ed", "#4fd18b", "#141197", "#9D9BF4"];

  useEffect(() => {
    if (data) {
      const container = document.getElementById("donutChart");
      container.replaceChildren();

      const timePeriod = data.find((item) => item.period === "ALL TIME");

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
          segmentElement.style.background = color[index];

          startAngle += (percentage / 100) * 360;

          container.appendChild(segmentElement);
        });

      const centerDiv = document.createElement("div");
      centerDiv.classList.add("center");
      centerDiv.innerHTML = `$ ${totalCount}`;
      container.appendChild(centerDiv);
    }
  }, [data]);

  return (
    <div className="donut-chart-block block">
      <div className="donut-chart-block block">
        <div className="donut-chart" id="donutChart"></div>
      </div>
    </div>
  );
};

export default DoughnutChart;
