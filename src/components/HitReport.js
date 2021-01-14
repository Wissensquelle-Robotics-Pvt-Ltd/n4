import React from 'react'
import { Card, Button, Table } from "react-bootstrap";
import HitTable from './HitTable'
function HitReport() {
    return (
           <div style={{ marginTop: 41 }}>
       <Table striped bordered hover variant="dark" id="emp">
        <thead>
          <tr>
            <th>#</th>
            <th>Number Of Users</th>
             <th>Total Amount</th>
            
           
          </tr>
        </thead>
        <tbody>
      <HitTable />
        </tbody>
      </Table>
      </div>
    )
}

export default HitReport
