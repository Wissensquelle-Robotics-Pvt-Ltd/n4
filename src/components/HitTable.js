import React, { useEffect, useState } from 'react'
import "firebase/firestore";
import Firebase from "../firebase";

const db = Firebase.firestore();

function HitTable() {
      const [users, setUsers] = useState([]);
  const [am, setAm] = useState([]);
   useEffect(() => {
             //   window.location.reload(false);
    /*  db.collection("finances").onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        alert(doc.get("cd"));
        mobile.push(doc.get("mobile"));
        setLength(length + 1);
      });
    }); */

    db.collection("bets")
      .orderBy("number")
      .get()
      .then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {
          setUsers((users) => [...users, doc.get("users")]);
          setAm((am) => [...am, doc.get("amount")]);
          
        });
      });
  }, []);
    return [...Array(10)].map((elementInArray, index) => (
    <tr>
      <td>{index}</td>
      <td>{users[index]}</td>
      <td>{am[index]}</td>
      
     
    </tr>
  ));
}

export default HitTable
