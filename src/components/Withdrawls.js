import React from 'react'
import { Card, Button, Table } from "react-bootstrap";
import WithdrawTables from './WithdrawTables.js'
function Withdrawls() {
    return (
            <div style={{ marginTop: 41 }}>
       <Table striped bordered hover variant="dark" id="emp">
        <thead>
          <tr>
            <th>#</th>
            <th>Mobile Number</th>
             <th>Account Number</th>
            <th>IFSC Code</th>
            <th>Account Holder's Name</th>
            <th>Amount</th>
           
          </tr>
        </thead>
        <tbody>
      <WithdrawTables />
        </tbody>
      </Table>
      </div>
    )
}

export default Withdrawls
