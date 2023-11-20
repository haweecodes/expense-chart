import React, { useEffect } from "react";
import { getColors } from "../../utils";
import "./style.css";

const DoughnutChart = ({ data, filterState }) => {
  function generateConicGradient(timePeriod) {
    const numericValues = Object.values(timePeriod).filter(
      (value) => typeof value === "number"
    );
    const totalCount = numericValues.reduce((acc, value) => acc + value, 0);

    let prevStart = 0;
    const colorStops = Object.keys(timePeriod)
      .filter((key) => key !== "period")
      .map((value, index) => {
        const percentage = (timePeriod[value] / totalCount) * 100;
        const start = prevStart;
        const end = start + percentage;
        prevStart = end;

        return `${getColors(index)} ${start}% ${end}%`;
      });

    return `conic-gradient(${colorStops.join(", ")})`;
  }

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
      container.style.background = generateConicGradient(timePeriod);

      const centerDiv = document.createElement("div");
      centerDiv.classList.add("center");
      centerDiv.innerHTML = `$ ${totalCount.toFixed(2)}`;
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
