import React, { useState } from "react";
import SaleList from "../SaleList";
import axios from "axios";
import { useHistory } from "react-router";
import { Button, Select } from "antd";
import { Link } from "react-router-dom";
const { Option } = Select;

export default function SaleForm() {
  const [sale, setSale] = useState([]);
  const [status, setStatus] = useState("");
  const [region, setRegion] = useState("");
  const [agent, setAgent] = useState("");
  const [loading, setLoading] = useState("");
  const [opening, setOpening] = useState("");
  const [discount, setDiscount] = useState("");

  const agentList = ["KAH 390B"];
  const history = useHistory();

  const handleStatusChange = value => {
    setStatus(value);
  };
  const handleRegionChange = value => {
    setRegion(value);
  };
  const handleAgentChange = value => {
    setAgent(value);
  };

  const handleSaleListChange = item => {
    setSale(item);
    console.log(sale);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("https://bomadistapi.herokuapp.com/api/v1/order/", {
        agent: agent,
        region: region,
        status: status,
        loading: loading,
        opening: opening,
        discount: discount
      });
    } catch (error) {
      console.log(error);
    }
    setSale([]);
    history.push("/dashboard");
  };

  return (
    <div>
      <div className="title">
        <div className="border-b mb-6 flex">
          <h3 className="text-2xl text-gray-500">Sales Details</h3>
          <div class="ml-auto text-gray-500 text-xs sm:inline-flex hidden items-center mb-4">
            <Link to="/purchases">
              <button className="h-8 px-3 rounded-md shadow text-gray-500 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                <span class="mt-2 ml-2">Back to purchases</span>
              </button>
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <div className="w-full">
              <Select
                name="region"
                className="w-full "
                placeholder="Select Agent"
                onChange={handleAgentChange}
              >
                {agentList?.map(ag => (
                  <Option value={ag}>{ag}</Option>
                ))}
              </Select>
            </div>

            <div className="w-full ml-2">
              <Select
                name="region"
                className="w-full"
                placeholder="Select Region"
                onChange={handleRegionChange}
              >
                <Option value="Malaba">Malaba</Option>
                <Option value="Matete">Matete</Option>
                <Option value="Kakamega">Kakamega</Option>
                <Option value="Container">Container</Option>
              </Select>
            </div>
            <div className="w-full ml-2">
              <Select
                name="status"
                className="w-full"
                placeholder="Select Status"
                onChange={handleStatusChange}
              >
                <Option value="Paid">Paid</Option>
                <Option value="Pending">Pending</Option>
                <Option value="Validated">Validated</Option>
              </Select>
            </div>
            <div className="w-full ml-2">
              <input
                className="w-full block border py-1 px-1"
                name="opening"
                type="number"
                placeholder="Opening"
                value={opening}
                onChange={e => setOpening(e.target.value)}
              />
            </div>
            <div className="w-full ml-2">
              <input
                className="w-full block border py-1 px-1"
                name="loading"
                type="number"
                placeholder="Loading"
                value={loading}
                onChange={e => setLoading(e.target.value)}
              />
            </div>
            <div className="w-full ml-2">
              <input
                className="w-full block border py-1 px-1"
                name="discount"
                type="number"
                placeholder="Discount"
                value={discount}
                onChange={e => setDiscount(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <SaleList sale={sale} onSaleListChange={handleSaleListChange} />
          </div>
          <Button className="w-1/4" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
