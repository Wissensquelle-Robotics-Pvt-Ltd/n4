import React, { useState, useEffect } from "react";
import "firebase/firestore";
import { Modal, Button, Spinner, Form, Row, Col,Dropdown } from "react-bootstrap";

import Firebase from "./firebase";
const db = Firebase.firestore();
function ExtraAmountCard(props) {
  const [updater, setUpdater] = useState(false);
  const [length, setLength] = useState(0);
  const [value, setValue] = useState([]);
  const [amt, setAmt] = useState([]);
  const [user, setUser] = useState([]);
  const [ind, setInd] = useState(125265251455154111445151561551);
  const [docid,setDocid] = useState([])
  const [sure, setSure] = useState(false);
const [i,setI] = useState(null)
  const Close = () => setSure(false);
  const Sure = (index) => {
    setSure(true)
    setI(index)
}
  function ValueChanger(index) {
    props.amount(amt[index]);
    props.user(user[index]);
  }
  function CardRemover(index) {
  //  alert(docid[0])
    db.collection("currentgame")
    .doc(docid[index])

    
     .delete().then(function() {
    alert("Field successfully deleted!");
     window.location.reload(false);
}).catch(function(error) {
    alert("OOPS! Some error occured.");
});
  }
  useEffect(() => {
    /*  db.collection("finances").onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        alert(doc.get("cd"));
        mobile.push(doc.get("mobile"));
        setLength(length + 1);
        
      });
    },[]); */
    db.collection("currentgame")
      .orderBy("value")
      .get()

      .then(function (querySnapshot) {
        setLength(querySnapshot.size);

        querySnapshot.forEach(function (doc) {
          setValue((value) => [...value, doc.get("value")]);
          setAmt((amt) => [...amt, doc.get("amount")]);

          setUser((user) => [...user, doc.get("users")]);
          setDocid((docid) => [...docid, doc.get("docid")]);
        //  alert(doc.get("docid"))
        });
      });
  }, []);
  return [...Array(length)].map((elementInArray, index) => (
    <div
      style={{
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: 20,
      }}
      className={ind == index ? "selectedbox" : "box"}
      onClick={() => {
        ValueChanger(index);
        setInd(index);
      }}
      onDoubleClick={() => Sure(index)}
    >
      <div style={{ fontWeight: "bold", fontSize: 20, alignSelf: "center" }}>
        {value[index]}
      </div>
       <Modal show={sure} onHide={Close}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation Dialog</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to delete this field?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Close}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            CardRemover(i)
            Close()
            }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  ));
}

export default ExtraAmountCard;
