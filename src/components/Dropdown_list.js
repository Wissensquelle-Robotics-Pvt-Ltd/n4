import React from "react";
import five from "../assets/five.svg";
import seven from "../assets/seven.svg";

import { Dropdown } from "react-bootstrap";

function Dropdown_list(props) {
  return (
    <div
      class="p-3 mb-2 bg-warning text-white rounded-lg"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div style={{ fontWeight: "bold" }}>
        <img
          src={seven}
          width={50}
          style={{ paddingRight: 20, fontSize: 30 }}
        />

        {props.title}
      </div>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Select Time
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Daily</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Weekly</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Monthly</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div style={{ fontWeight: "bold", fontSize: 20 }}>{56}</div>
    </div>
  );
}

export default Dropdown_list;
