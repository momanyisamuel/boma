import React, { useEffect, useState } from "react";
import axios from "axios";

const Stats = ({ sales, prices }) => {
  // const [allTotals, setAllTotals] = useState(0);
  let allTotals = 0;
  let fPrice = 0;
  console.log(prices);
  const calculateTotals = obj => {
    if (obj) {
      for (let i = 0; i < obj.length; i++) {
        if (obj[i]) {
          for (let j = 0; j <= obj.length; j++) {
            if (obj[i][j]) {
              let price = parseFloat(obj[i][j].quantity * obj[i][j].price);
              fPrice += price;
              let q = parseInt(obj[i][j].quantity);
              allTotals += q;
            }
          }
        }
      }
    }
  };
  calculateTotals(sales);
  useEffect(() => {}, []);

  return (
    <div className="flex">
      <div className="ml-4 border px-4 py-1 text-green-500">
        Total inventory sold: {allTotals}
      </div>
      <div className="ml-4 border px-4 py-1 text-green-500">
        Total value: KES {fPrice}
      </div>
    </div>
  );
};

export default Stats;
