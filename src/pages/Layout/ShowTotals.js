import React from "react";

const ShowTotals = ({ sales }) => {
  let total = 0;
  for (let i = 0; i < sales.length; i++) {
    let q = sales[i].quantity;
    let ts = sales[i].price * sales[i].quantity;
    total += ts;
  }

  return <div>KES {total}</div>;
};

export default ShowTotals;
