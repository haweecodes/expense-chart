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

      const timePeriod = data.find((item) => item.period === filterState);

      if (!timePeriod) {
        console.error(`Data for ${timePeriod} period not found.`);
        return;
      }

      const numericValues = Object.values(timePeriod).filter(
        (value) => typeof value === "number"
      );

      const splitCount = String(
        numericValues.reduce((acc, value) => acc + value, 0.0)
      ).split(".");
      const decimalCount = splitCount[1] || "00";
      const totalCount = splitCount[0];
      container.style.background = generateConicGradient(timePeriod);

      const numberDiv = document.getElementById("number");
      const decimalDiv = document.getElementById("decimal");
      numberDiv.innerHTML = `$ ${totalCount}`;
      decimalDiv.innerHTML = `.${decimalCount}`;
    }
  }, [data, filterState]);

  return (
    <div className="donut-chart-block block">
      <div className="donut-chart-block block">
        <div className="donut-chart" id="donutChart">
          <div className="center">
            <span id="number"></span>
            <span id="decimal"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
