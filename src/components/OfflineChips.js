import React, { useState } from "react";
import "firebase/firestore";
import Firebase from "../firebase";
import "./OfflineChips.css";
import * as firebase from "firebase";

const db = Firebase.firestore();
function OfflineChips(props) {
  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState("91");
  const [balance, setBalance] = useState(0);
  const [add, setAdd] = useState(null);
  const [amount, setAmount] = useState(0);
  const [comment,setComment] = useState("")
  // console.log(props);
  function removeSpaces(string) {
    return string.split(" ").join("");
  }
  function Add() {
    var total = parseInt(balance) + parseInt(amount);
    if (amount == 0) {
      alert("Please Enter a Valid Amount");
    } else {
      db.collection("users")
        .doc(phone)
        .set({
          balance: total,
        })
        .then(function () {
          db.collection("finances")
            .add({
              Amount: amount,
              cd: "Credit",
              input: "Admin",
              mobile: phone,
              comment: comment,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(function (docRef) {
              setBalance(total);
              alert("Balance Updated Successfully");
              setVisible(false);
            })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });
        })
        .catch(function (error) {
          alert("Some error occured while updating Balance.");
        });
    }
  }
  function Withdraw() {
    var total = balance - amount;
    if (amount == 0) {
      alert("Please enter a valid amount");
    } else if (balance <= 100) {
      alert("Reserve Money is Required");
    } else if (total < 100) {
      alert("Reserve is required");
    } else {
      db.collection("users")
        .doc(phone)
        .set({
          balance: total,
        })
        .then(function () {
          db.collection("finances")
            .add({
              Amount: amount,
              cd: "Debit",
              input: "Admin",
              mobile: phone,
                            comment: comment,

              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(function (docRef) {
              setBalance(total);
              alert("Balance Updated Successfully");
              setVisible(false);
            })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });
        })
        .catch(function (error) {
          alert("Some error occured while updating Balance.");
        });
    }
  }

  function VisibilityToggler() {
    if (visible == true) {
      setVisible(!visible);
      setAdd(null);
      setPhone(0);
    } else {
      if (phone.length != 10) {
        alert("Please Enter a Valid Phone Number");
        setAdd(null);
      } else {
        var docRef = db.collection("users").doc(phone);
        docRef.get().then(function (doc) {
          if (doc.exists) {
            db.collection("users")
              .doc(phone)
              .onSnapshot(function (doc) {
                setBalance(doc.get("balance"));
              });
            setVisible(!visible);
          } else {
            alert("Phone Number Not Registered");
            setAdd(null);
          }
        });
      }
    }
  }
  if (visible) {
    return (
      <>
        <div
          style={{
            margin: 20,
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            paddingTop: 40,
          }}
        >
          <div
            onClick={() => VisibilityToggler()}
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
            className="box"
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              Add
            </div>
          </div>
          <div
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginLeft: "10%",
              marginRight: "10%",
            }}
            className="box"
            onClick={() => {
              VisibilityToggler();
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              Withdraw
            </div>
          </div>
          <div
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
            className="box"
            onClick={props.click}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              Reports
            </div>
          </div>
        </div>

        <div
          style={{
            marginHorizontal: 20,
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            paddingTop: 40,
          }}
        >
          Mobile Number : {phone}
        </div>
        <div
          style={{
            marginHorizontal: 20,
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          Current Balance : {balance}
        </div>
        <div
          style={{
            marginHorizontal: 20,
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          Amount:
          <input
            placeholder="Enter Amount"
            style={{ marginLeft: 10, marginRight: 10, display: "block" }}
            onChange={(event) => setAmount(event.target.value)}
            type="number"
          />
            <input
            placeholder="Enter Comments"
            style={{ marginLeft: 10, marginRight: 10, display: "block" }}
            onChange={(event) => setComment(event.target.value)}
            
          />
          <button onClick={() => (add ? Add() : Withdraw())}>
            {add ? "Add" : "Withdraw"}
          </button>
        </div>
       
      </>
    );
  } else {
    return (
      <>
        <div
          style={{
            margin: 20,
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            paddingTop: 40,
          }}
        >
          <div
            onClick={() => {
              VisibilityToggler();
              setAdd(true);
            }}
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
            className="box"
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              Add
            </div>
          </div>
          <div
            onClick={() => {
              VisibilityToggler();
              setAdd(false);
            }}
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginLeft: "10%",
              marginRight: "10%",
            }}
            className="box"
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              Withdraw
            </div>
          </div>
          <div
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
            className="box"
            onClick={props.click}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              Reports
            </div>
          </div>
        </div>
        <div
          style={{
            marginHorizontal: 20,
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            paddingTop: 40,
          }}
        >
          Mobile Number:
          <input
            placeholder="Enter Mobile Number"
            style={{ marginLeft: 10 }}
            onChange={(event) => setPhone(event.target.value)}
            type="number"
          />
        </div>
      </>
    );
  }
}

export default OfflineChips;
