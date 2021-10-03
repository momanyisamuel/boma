import React, { useState, useEffect } from "react";

import { useHistory } from "react-router";

import { Link } from "react-router-dom";
import axios from "axios";
import ShowProduct from "./ShowProduct";
import InventoryStats from "./InventoryStats";

const Inventory = () => {
  const [data, setData] = useState();
  const history = useHistory();
  const getTableData = async () => {
    try {
      const inventory = await axios.get(
        "https://bomadistapi.herokuapp.com/api/v1/inventory/"
      );
      setData(inventory.data.data);
      console.log(inventory.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDateFormat = dateString => {
    const date = new Date(dateString);
    const df = `${date.getDate()}.${date.getMonth() +
      1}.${date.getFullYear()} `;
    return df;
  };
  const getTimeFormat = dateString => {
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const handleClick = async (e, itemId) => {
    e.preventDefault();
    try {
      await axios.delete(
        "https://bomadistapi.herokuapp.com/api/v1/inventory/" + itemId
      );
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);
  return (
    <div class="sm:p-7 p-4">
      <div class="flex w-full items-center mb-7">
        <button class="inline-flex mr-3 items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
          <svg
            viewBox="0 0 24 24"
            class="w-4 mr-2 text-gray-400 dark:text-gray-600"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Last 30 days
          <svg
            viewBox="0 0 24 24"
            class="w-4 ml-1.5 text-gray-400 dark:text-gray-600"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <button class="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
          Filter by
          <svg
            viewBox="0 0 24 24"
            class="w-4 ml-1.5 text-gray-400 dark:text-gray-600"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div>
          <InventoryStats inventory={data} />
        </div>
        <div class="ml-auto text-gray-500 text-xs sm:inline-flex hidden items-center">
          <Link to="/inventory/new">
            <button className="h-8 px-3 rounded-md shadow text-white bg-blue-500">
              Add Inventory
            </button>
          </Link>
        </div>
      </div>
      <table class="w-full text-left">
        <thead>
          <tr class="text-gray-400">
            <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              # Inventory Id
            </th>
            <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Date Created
            </th>
            <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">
              Region
            </th>
            <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Product
            </th>
            <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">
              Damaged
            </th>
            <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">
              Total
            </th>
            <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white"></th>
          </tr>
        </thead>
        <tbody class="text-gray-600 dark:text-gray-100">
          {data?.map((item, value) => (
            <tr>
              <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <div class="flex items-center">
                  <svg
                    viewBox="0 0 24 24"
                    class="w-4 mr-5 text-gray-400"
                    stroke="currentColor"
                    stroke-width="3"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect
                      x="1"
                      y="4"
                      width="22"
                      height="16"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                  {item._id.slice(0, 6)}
                </div>
              </td>
              <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <div class="flex items-center">
                  <div class="sm:flex hidden flex-col">
                    {getDateFormat(item.createdAt)}
                    <div class="text-gray-400 text-xs">
                      {getTimeFormat(item.createdAt)}
                    </div>
                  </div>
                </div>
              </td>
              <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
                <div class="flex items-center">{item.region}</div>
              </td>
              <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 ">
                <ShowProduct product={item.productId} />
              </td>
              <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">
                - {item.damaged}
              </td>
              <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-green-500">
                <div class="flex items-center">
                  <div class="sm:flex hidden flex-col">
                    + {item.received - item.damaged}
                  </div>
                </div>
              </td>

              <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <div class="flex items-center">
                  <button
                    class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto"
                    onClick={e => handleClick(e, item._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div class="flex">
        <div class="justify-start mt-5 w-full text-gray-500 text-xs sm:inline-flex hidden items-center">
          <span class="mr-3">Page 2 of 4</span>
          <button class="inline-flex mr-2 items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none py-0">
            <svg
              class="w-4"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button class="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none py-0">
            <svg
              class="w-4"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <div class="flex w-full mt-5 space-x-2 justify-end">
          <button class="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
            <svg
              class="w-4"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button class="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
            1
          </button>
          <button class="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 dark:text-white leading-none">
            2
          </button>
          <button class="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
            3
          </button>
          <button class="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
            4
          </button>
          <button class="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
            <svg
              class="w-4"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
