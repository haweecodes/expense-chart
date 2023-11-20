import React, { useEffect, useState } from "react";
import Filter from "../period-filter";
import DoughnutChart from "../chart/doughnut-chart";
import Legend from "../legend/index";
import "./style.css";

const Card = ({ data }) => {
  const [filter, setFilter] = useState([]);
  const [filterState, setFilterState] = useState(null);

  useEffect(() => {
    const temp = data.reduce((accumulator, value) => {
      accumulator.push(value?.period);
      return accumulator;
    }, [...filter]);

    setFilter([...temp]);
    setFilterState(temp[0]);
  }, [data]);

  return (
    <div className="card">
      <p className="card-title">Expenses</p>{" "}
      {filter.length > 0 && data && filterState && (
        <>
          <Filter
            filter={filter}
            currentFilterState={(value) => {
              setFilterState(value);
            }}
          ></Filter>
          <DoughnutChart data={data} filterState={filterState}></DoughnutChart>
          <Legend data={data} filterState={filterState}></Legend>
        </>
      )}
    </div>
  );
};

export default Card;
