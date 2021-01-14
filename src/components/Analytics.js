import React, { useState, useEffect } from "react";
import { Card, Button, Table } from "react-bootstrap";
import Report from "./Report";

function Analytics() {
  const [serial, setSerial] = useState(1);

  return (
    <div style={{ marginTop: 41 }}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Mobile Number</th>
            <th>Comments</th>
            <th>Input</th>
            <th>Credit/Debit</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <Report />
        </tbody>
      </Table>
    </div>
  );
}

export default Analytics;
