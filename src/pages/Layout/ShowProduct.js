import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowProduct = ({ product }) => {
  console.log(product);
  const [data, setData] = useState("");
  const getTableData = async () => {
    try {
      const result = await axios.get(
        "https://bomadistapi.herokuapp.com/api/v1/product/" + product
      );
      setData(result.data.data.pname);
      console.log(result.data.data.pname);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);
  return <div>{data}</div>;
};

export default ShowProduct;
