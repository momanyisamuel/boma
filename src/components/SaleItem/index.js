import { Select, Input, InputNumber } from "antd";
import { useState, useEffect } from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
const { Option } = Select;

const SaleItem = ({ data, onItemDelete, idx, item, onItemChange }) => {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState("");
  const [quantity, setQuantity] = useState("1");

  const [saleItem, setSaleItem] = useState();

  function onProductChange(value) {
    const selectedProduct = value;
    console.log(`selected ${value}`);
    const selectedValuePrice = data.find(
      element => element._id === selectedProduct
    );
    console.log(selectedValuePrice);
    item.product = value;
    setProduct(selectedValuePrice.pname);
    setPrice(selectedValuePrice.sellingprice);
  }

  const getTotal = () => {
    const itemTotal = quantity * price;
    setTotal(itemTotal);
  };
  const handleQuantityChange = value => {
    setQuantity(value);
  };

  useEffect(() => {
    getTotal();
    setSaleItem({
      product: product,
      price: price,
      quantity: quantity
    });
    onItemChange(saleItem, idx);
  }, [total, price, quantity, product]);
  return (
    <div className="flex w-full">
      <div className="w-full">
        <Select
          className="w-full"
          showSearch
          onChange={onProductChange}
          name="product"
          placeholder="Product"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {data?.map((item, key) => (
            <Option key={item._id} value={item._id}>
              {item.pname}
            </Option>
          ))}
        </Select>
      </div>
      <div className="">
        <InputNumber name="price" className="" value={price} />
      </div>
      <div className="">
        <InputNumber
          name="quantity"
          className=""
          min={1}
          defaultValue={1}
          onChange={handleQuantityChange}
        />
      </div>
      <div className="">
        <InputNumber
          name="total"
          className="w-full"
          value={total}
          onFocus={getTotal}
        />
      </div>

      <MinusCircleOutlined
        className="text-3xl ml-4 text-gray-500"
        onClick={e => onItemDelete(idx)}
      />
    </div>
  );
};

export default SaleItem;
