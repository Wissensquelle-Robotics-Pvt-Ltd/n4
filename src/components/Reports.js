import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./Reports.css";
import { Card, Button, Table } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import ReportCol from './ReportCol'
import {TextField} from '@material-ui/core'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import "firebase/firestore";
import Firebase from "../firebase";
const db = Firebase.firestore();
let newDate = new Date()
function Reports() {
  const [startDate, setStartDate] = useState(new Date());
const [toDate,setTodate] = useState(new Date())
    const [length, setLength] = useState(0);

function DocDelete(){
 db.collection("database")
          .where('date', '>=', (startDate))
          .where('date','<=',toDate)
 
                        

  .get()
    .then(function(querySnapshot) {
         
        querySnapshot.forEach(function(doc) {
         
        //  setLength(querySnapshot.size);
           for(var i=0;i<querySnapshot.size;i++){
            // doc.data() is never undefined for query doc snapshots
       querySnapshot.docs[i].ref.delete();
      // alert(i)
       }
        });
    })
    .then(function() {
      alert("Fields Successfully Deleted.")
      window.location.reload(false);
    } )
    .catch(function(error) {
     alert(error)
    });
}
  return (
    <>
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div
        style={{
          marginTop: 50,
          justifyContent: "space-around",
          flexDirection: "row",
          display: "flex",
          width: "50%",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ marginBottom: 50 }}>
           
           <form  noValidate>
  <TextField
    id="date"
    label="From"
    type="date"
onChange={(event) => {setStartDate(event.target.value)}}  
    InputLabelProps={{
      shrink: true,
    }}
  />
</form>
          </div>
         <Button  onClick={() => DocDelete()}>Delete</Button>
        </div>
        <div>
          <div style={{ marginBottom: 50 }}>
         
                 <form  noValidate>
  <TextField
    id="date"
    label="To"
    type="date"
  onChange={(event) => {setTodate(event.target.value)
  //alert(event.target.value)
 }}  
    InputLabelProps={{
      shrink: true,
    }}
  />
</form>
      

          </div>   
             <ReactHTMLTableToExcel  
                                                className="btn btn-info"  
                                                table="emp"  
                                                filename="ReportExcel"  
                                                sheet="Sheet"  
                                                buttonText="Export excel" />  
        </div>
      </div>
    </div>
      <div style={{ marginTop: 41 }}>
      <Table striped bordered hover variant="dark" id="emp">
        <thead>
          <tr>
            <th>#</th>
            <th>Mobile Number</th>
             <th>Date</th>
            <th>Time</th>
            <th>Betting Amount</th>
            <th>Status</th>
           
          </tr>
        </thead>
        <tbody>
         <ReportCol from={startDate} to={toDate}  />
        </tbody>
      </Table>
    </div>
    </>
  );
}

export default Reports;
