import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const Products = () => {
  const [products, setProducts] = useState({
    pname: "",
    category: "",
    buyingprice: "",
    sellingprice: "",
    size: ""
  });
  const [data, setData] = useState();
  const [cData, setCData] = useState();

  const history = useHistory();

  const handleItemChange = (event, value) => {
    let values = products;
    values[event.target.name] = event.target.value || value;
    setProducts(values);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "https://bomadistapi.herokuapp.com/api/v1/product"
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://bomadistapi.herokuapp.com/api/v1/category"
      );
      setCData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (event, itemId) => {
    event.preventDefault();
    try {
      await axios.delete(
        "https://bomadistapi.herokuapp.com/api/v1/product/" + itemId
      );
      history.push("/products");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post("https://bomadistapi.herokuapp.com/api/v1/product", {
        pname: products.pname,
        category: products.category,
        buyingprice: products.buyingprice,
        sellingprice: products.sellingprice,
        size: products.size
      });
      history.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, [products, cData]);

  return (
    <div className="sm:p-7 p-4">
      <div className="flex w-full">
        <form onSubmit={handleSubmit} className="text-left flex flex-col w-1/2">
          <div className="mb-6">
            <div className="flex mb-6">
              <div className="">
                <label for="name" className="text-sm mb-1 block">
                  Name
                </label>
                <input
                  type="text"
                  name="pname"
                  onChange={event => handleItemChange(event)}
                  className="block border rounded py-2 px-2 font-light text-sm"
                  placeholder="Product Name"
                />
              </div>
              <div className="ml-4">
                <label for="buying" className="text-sm mb-1 block">
                  Buying Price
                </label>
                <input
                  type="text"
                  name="buyingprice"
                  onChange={event => handleItemChange(event)}
                  className="block border rounded py-2 px-2 font-light text-sm"
                  placeholder="Buying Price"
                />
              </div>
            </div>
            <div className="flex mb-4">
              <div className="">
                <label for="selling" className="text-sm mb-1 block">
                  Selling Price
                </label>
                <input
                  type="text"
                  name="sellingprice"
                  onChange={event => handleItemChange(event)}
                  className="block border rounded py-2 px-2 font-light text-sm"
                  placeholder="Selling Price"
                />
              </div>
              <div className="ml-4">
                <label for="size" className="text-sm mb-1 block">
                  Product Size
                </label>
                <input
                  type="text"
                  name="size"
                  onChange={event => handleItemChange(event)}
                  className="block border rounded py-2 px-2 font-light text-sm"
                  placeholder="Product Name"
                />
              </div>
            </div>
            <div className="flex">
              <div className="">
                <label for="category" className="text-sm mb-1 block">
                  Category
                </label>
                <select
                  name="category"
                  onChange={value => handleItemChange(value)}
                  className="block border rounded py-2 px-2 font-light text-sm bg-white focus:outline-none"
                  placeholder=""
                  id=""
                >
                  <option value="0">Select Category</option>
                  {cData?.map(item => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button className="block mr-auto btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-gray-700 hover:bg-gray-700 text-gray-700 hover:text-white font-base text-sm py-1 px-6 rounded">
            Submit
          </button>
        </form>
        <div className="flex w-1/2 flex-col">
          {data?.map(product => (
            <div className=" flex justify-between shadow-sm font-light text-sm p-4 mb-2 border rounded ">
              <div className="Title flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                <span className="ml-2">{product.pname}</span>
              </div>
              <div className="Details flex">
                <button
                  onClick={event => handleDelete(event, product._id)}
                  className="mr-1 block btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-gray-700 hover:bg-gray-700 text-gray-700 hover:text-white font-normal py-1 px-2 rounded"
                >
                  Delete
                </button>
                <button className="ml-auto block btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-gray-700 hover:bg-gray-700 text-gray-700 hover:text-white font-normal py-1 px-2 rounded">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
