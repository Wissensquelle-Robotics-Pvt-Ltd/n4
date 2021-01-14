import React, { useEffect, useState } from "react";
import "firebase/firestore";
import Firebase from "../firebase";
const db = Firebase.firestore();

function TableColumns(props) {
  const [length, setLength] = useState(0);
  const [mobile, setMobile] = useState([]);
  const [input, setInput] = useState([]);
  const [cd, setCd] = useState([]);
  const [amount, setAmount] = useState([]);
  const [comments,setComments] = useState([])
  useEffect(() => {
    /*  db.collection("finances").onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        alert(doc.get("cd"));
        mobile.push(doc.get("mobile"));
        setLength(length + 1);
      });
    }); */

    db.collection("finances")
      .orderBy("timestamp", "desc")
      .get()
      .then(function (querySnapshot) {
        setLength(querySnapshot.size);

        querySnapshot.forEach(function (doc) {
          setMobile((mobile) => [...mobile, doc.get("mobile")]);
          setInput((input) => [...input, doc.get("input")]);
          setCd((cd) => [...cd, doc.get("cd")]);
          setAmount((amount) => [...amount, doc.get("Amount")]);
                    setComments((comments) => [...comments, doc.get("comment")]);

        });
      });
  }, []);
  return [...Array(length)].map((elementInArray, index) => (
    <tr>
      <td>{index + 1}</td>
      <td>{mobile[index]}</td>
      <td>{comments[index]}</td>
      <td>{input[index]}</td>
      <td>{cd[index]}</td>
      <td>{amount[index]}</td>
    </tr>
  ));
}

export default TableColumns;
