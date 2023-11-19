import React from "react";
import Filter from "../period-filter";
import "./style.css";

const filter = ['1M', '6M', '1Y', 'ALL TIME'];


const Card = () => {
  return (
    <div className="card">
      <p className="card-title">Expenses</p> 
      <Filter filter={filter} currentFilterState={(value) => {console.log(value)}}></Filter>
      <p>chart</p>
      <p>legend</p>
    </div>
  );
};

export default Card;
