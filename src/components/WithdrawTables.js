import React, { useEffect, useState } from 'react'
import "firebase/firestore";
import Firebase from "../firebase";
import {  Button } from "react-bootstrap";
import {useRefresh} from 'react-tidy'

const db = Firebase.firestore();

function WithdrawTables() {
    const refresh = useRefresh()
     const [length, setLength] = useState(0);
     const [m, setM] = useState([]);
  const [account, setAccount] = useState([]);
  const [ifsc, setIfsc] = useState([]);
  const [n,setN] = useState([])
  const [amo, setAmo] = useState([]);
  const [change,setChange] =  useState(false)

  function deleteDoc(index){
db.collection("withdrawls")
       .orderBy("timestamp")
 
                        

  .get()
    .then(function(querySnapshot) {
         
        querySnapshot.forEach(function(doc) {
         
        //  setLength(querySnapshot.size);
          
            // doc.data() is never undefined for query doc snapshots
       querySnapshot.docs[index].ref.delete();
      // alert(i)
       
        });
    })
    .then(function() {
      alert("Fields Successfully Updated.")
    setChange(!change)
      refresh()
    } )
    .catch(function(error) {
     alert(error)
    });
  }
       useEffect(() => {
             //   window.location.reload(false);
    /*  db.collection("finances").onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        alert(doc.get("cd"));
        mobile.push(doc.get("mobile"));
        setLength(length + 1);
      });
    }); */

    db.collection("withdrawls")
      .orderBy("timestamp")
      .get()
      .then(function (querySnapshot) {
        setLength(querySnapshot.size);

        querySnapshot.forEach(function (doc) {
          setM((m) => [...m, doc.get("mobil")]);
          setAccount((account) => [...account, doc.get("account")]);
          setIfsc((ifsc) => [...ifsc, doc.get("ifsc")]);
          setN((n) => [...n,doc.get("na")]);
          setAmo((amo) => [...amo, doc.get("amount")]);
        });
      });
  }, [change]);
    return [...Array(length)].map((elementInArray, index) => (
    <tr>
      <td>{index + 1}</td>
      <td>{m[index]}</td>
      <td>{account[index]}</td>
      <td>{ifsc[index]}</td>
      <td>{n[index]}</td>
      <td>{amo[index]}</td>
      <td><Button variant="outline-info" onClick={() => deleteDoc(index)}>Paid</Button></td>
    </tr>
  ));
}

export default WithdrawTables
