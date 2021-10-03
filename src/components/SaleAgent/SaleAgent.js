import React from "react";
import { Select } from "antd";

const { Option } = Select;

export default function SaleAgent({ agents, onAgentChange }) {
  console.log(agents);
  return (
    <Select name="agent" placeholder="Select Agent" onChange={onAgentChange}>
      {agents?.map((a) => {
        {
          console.log(a);
        }
        <Option value={a}>{a}</Option>;
      })}
    </Select>
  );
}
