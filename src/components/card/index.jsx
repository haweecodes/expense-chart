import React, { useState } from "react";
import Filter from "../period-filter";
import DoughnutChart from "../chart/doughnut-chart";
import Legend from "../legend/index";
import "./style.css";

const filter = ['1M', '6M', '1Y', 'ALL TIME'];
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

const Card = () => {
  const [filterState, setFilterState] = useState(filter[0]);

  return (
    <div className="card">
      <p className="card-title">Expenses</p> 
      <Filter filter={filter} currentFilterState={(value) => {setFilterState(value)}}></Filter>
      <DoughnutChart></DoughnutChart>
      <Legend data={data} filterState={filterState}></Legend>
    </div>
  );
};

export default Card;
