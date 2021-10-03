import { useState, useEffect } from "react";
import SaleItem from "../SaleItem";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const SaleList = ({ sale, onSaleListChange }) => {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        "https://bomadistapi.herokuapp.com/api/v1/product/"
      );
      console.log(res);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleItemChange = (item, itemIndex) => {
    const newSale = [...sale];
    newSale[itemIndex] = item;
    onSaleListChange(newSale);
  };

  const handleAddFields = () => {
    setProducts([...products, { product: "", quantity: "", total: "" }]);
  };

  const handleRemoveFields = index => {
    const values = [...products];
    values.splice(index, 1);
    setProducts(values);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full">
      {products.map((product, index) => (
        <div className="w-full flex mb-2">
          <SaleItem
            key={index + 2}
            data={data}
            onItemDelete={handleRemoveFields}
            onItemChange={handleItemChange}
            idx={index}
            item={sale}
          />
        </div>
      ))}
      <Button
        className="w-full"
        type="dashed"
        onClick={handleAddFields}
        icon={
          <PlusCircleOutlined className="text-xl" onClick={handleAddFields} />
        }
      >
        Add Product
      </Button>
    </div>
  );
};

export default SaleList;
