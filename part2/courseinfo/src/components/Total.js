import React from "react";

const Total = ({ parts }) => {
  const arry = parts.map((part) => part.exercises);
  const total = arry.reduce((res, current) => res + current);
  return <h4>Total of {total} exercises</h4>;
};

export default Total;