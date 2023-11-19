import React, { useState } from "react";
import "./style.css";

const Filter = ({ filter, currentFilterState }) => {
  if (!Array.isArray(filter)) {
    throw Error("filter value not an array");
  }

  const [activeState, setActiveState] = useState(filter[0]);
  const handleFilter = (value) => {
    setActiveState(value);
    currentFilterState(value);
  };

  return (
    <div className="filter filter-wrapper">
      {filter.map((value) => (
        <p
          key={value}
          style={{ margin: 0 }}
          className={value === activeState ? "active" : ""}
          onClick={() => handleFilter(value)}
        >
          {value}
        </p>
      ))}
    </div>
  );
};

export default Filter;
