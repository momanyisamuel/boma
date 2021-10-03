import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

export default function Categories() {
  const [categories, setCategories] = useState({
    cname: "",
    description: ""
  });
  const [data, setData] = useState();

  const history = useHistory();

  const handleItemChange = (event, value) => {
    let values = categories;
    values[event.target.name] = event.target.value || value;
    console.log(values);
    setCategories(values);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://bomadistapi.herokuapp.com/api/v1/category"
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (event, itemId) => {
    event.preventDefault();
    try {
      await axios.delete(
        "https://bomadistapi.herokuapp.com/api/v1/category/" + itemId
      );
      history.push("/settings");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post("https://bomadistapi.herokuapp.com/api/v1/category", {
        name: categories.cname,
        description: categories.description
      });
      window.location.reload(false);
      history.push("/settings");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, [categories]);

  return (
    <div className="sm:p-7 p-4">
      <div className="border-b mb-6">
        <h4 className="text-xl">Categories</h4>
      </div>
      <div className="flex w-full">
        <form onSubmit={handleSubmit} className="text-left flex flex-col w-1/2">
          <div className="">
            <div className="flex flex-col mb-6">
              <div className="mb-4 w-full">
                <label for="name" className="text-sm mb-1 block">
                  Name
                </label>
                <input
                  type="text"
                  name="cname"
                  onChange={event => handleItemChange(event)}
                  className="block border rounded py-2 px-2 font-light text-sm"
                  placeholder="Category Name"
                />
              </div>
              <div className="w-full">
                <label for="buying" className="text-sm mb-1 block">
                  Description
                </label>
                <textarea
                  name="description"
                  onChange={event => handleItemChange(event)}
                  className="border rounded py-2 px-2 font-light w-1/2 h-25"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="block mr-auto btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-gray-700 hover:bg-gray-700 text-gray-700 hover:text-white font-base text-sm py-1 px-6 rounded"
          >
            Submit
          </button>
        </form>
        <div className="flex w-1/2 flex-col">
          {data?.map(category => (
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
                <span className="ml-2">{category.name}</span>
              </div>
              <div className="Details flex">
                <button
                  onClick={event => handleDelete(event, category._id)}
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
}
