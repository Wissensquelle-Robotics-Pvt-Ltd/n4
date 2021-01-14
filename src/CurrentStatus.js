import React, { useState, useEffect } from "react";
import "./CurrentStatus.css";
import ExtraAmountCard from "./ExtraAmountCard";
import "firebase/firestore";
import Firebase from "./firebase";

import {
  Modal,
  Button,
  Spinner,
  Form,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
const db = Firebase.firestore();

function CurrentStatus(props) {
  const [show, setShow] = useState(false);
  const [showsecond, setShowsecond] = useState(false);
  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [time, setTime] = useState("");
  const [balance, setBalance] = useState(0);

  const [amount, setAmount] = useState();
  const [users, setUsers] = useState();
  const [amt, setAmt] = useState(5);
  const [amtB, setAmtB] = useState(0);
  const [open, setOpen] = useState(false);
  const [am, setAm] = useState([]);

  const handleOpenBalance = () => {
    setShowsecond(true);
  };
  const handleCloseBalance = () => {
    setShowsecond(false);
  };

  const changeMainBalance = () => {
    if (amtB == 0) {
      alert("Please enter a valid amount.");
    } else {
      handleCloseBalance();
      db.collection("timings")
        .doc("time")
        .update({
          balance: amtB,
        })
        .then(function (docRef) {
          // console.log(value);
          setBalance(amtB);
          alert("Balance updated successfully.");
        })
        .catch(function (error) {
          alert("OOPS! Some Error Occured.");
        });
    }
  };

  const ValueUpdater = (value) => {
    db.collection("timings")
      .doc("time")
      .update({
        duration: value,
      })
      .then(function (docRef) {
        // console.log(value);
        if (value === 0.3) {
          setTime("30 Minutes");
        } else if (value === 0.15) {
          setTime("15 Minutes");
        } else if (value === 0.45) {
          setTime("45 Minutes");
        } else {
          setTime(`${value} Hours`);
        }
        alert("Timing updated successfully.");
      })
      .catch(function (error) {
        alert("OOPS! Some Error Occured.");
      });

    // db.collection("timings")
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.forEach((doc) => {
    //       if (doc && doc.exists) {
    //         console.log(doc.id, " => ", doc.data());
    //       }
    //     });
    //   })
    //   .catch((err) => console.log(err));

    // db.collection("timings")
    //   .get()
    //   .then((snapshot) => snapshot.docs.map((x) => console.log(x.data())));
  };
  useEffect(() => {
    //   window.location.reload(false);
    /*  db.collection("finances").onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        alert(doc.get("cd"));
        mobile.push(doc.get("mobile"));
        setLength(length + 1);
      });
    }); */

    // db.collection("timings")
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.forEach((doc) => {
    //       if (doc && doc.exists) {
    //         // console.log(doc.id, " => ", );
    //         console.log(doc.data().balance);
    //         setBalance(doc.data().balance);
    //       }
    //     });
    //   })
    //   .catch((err) => console.log(err));

    db.collection("timings")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doct) => {
          if (doct && doct.exists) {
            // console.log(doc.id, " => ", doc.data().duration);

            setBalance(doct.data().balance);
            console.log(doct.data().balance);
            console.log(doct.data().duration);
            if (doct.data().duration === 0.3) {
              setTime("30 Minutes");
            } else if (doct.data().duration === 0.15) {
              setTime("15 Minutes");
            } else if (doct.data().duration === 0.45) {
              setTime("45 Minutes");
            } else {
              setTime(`${doct.data().duration} Hours`);
            }
          }
        });
      })
      .catch((err) => console.log(err));

    db.collection("bets")
      .orderBy("amount")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setAm((am) => [...am, doc.get("number")]);
        });
      });
  }, []);
  const handleClose = () => {
    setShow(false);
  };
  // .then((querySnapshot) => {
  //    alert(querySnapshot.get("active"));
  // });
  function AmountSetter(x) {
    setAmount(x);
  }
  function UserSetter(y) {
    setUsers(y);
  }

  function ValSetter() {
    if (amt == 0) {
      alert("Please enter a valid amount.");
    } else {
      handleClose();
      // alert("hey");
      db.collection("currentgame")
        .add({})
        .then(function (docRef) {
          db.collection("currentgame")
            .doc(docRef.id)
            .set({
              amount: 0,
              users: 0,
              value: parseInt(amt),
              docid: docRef.id,
            })
            .then(function (docRef) {
              alert("Amount added successfully.");
              handleClose();
              window.location.reload(false);
            })
            .catch(function (error) {
              alert("OOPS! Some Error Occured.");
              handleClose();
            });
        })
        .catch(function (error) {
          alert(error);
        });
    }
  }

  return (
    <div>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          paddingTop: 40,
          // backgroundColor: "#489",
          width: "100%",
          // alignItems: "center",
          //   marginLeft: "10%",
        }}
      >
        <div
          style={{
            marginTop: 20,
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            //  backgroundColor: "#000",
            width: "80%",
            marginLeft: "10%",
          }}
          className="container"
        >
          <ExtraAmountCard amount={AmountSetter} user={UserSetter} />
        </div>
        <div
          style={{
            width: "7%",

            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 20,
            marginRight: 20,
          }}
          className="boxa"
          onClick={() => handleShow()}
        >
          <div
            style={{ fontWeight: "bold", fontSize: 20, alignSelf: "center" }}
          >
            Add
          </div>
        </div>
      </div>

      <div
        style={{
          margin: 20,
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="backab"
        >
          <div
            style={{ fontWeight: "bold", fontSize: 50, alignSelf: "center" }}
          >
            {amount}
          </div>

          <div style={{ fontWeight: "bold" }}>Total Amount Received</div>
        </div>
        <div
          style={{
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="backb"
        >
          <div style={{ fontWeight: "bold", fontSize: 50 }}>{users}</div>

          <div style={{ fontWeight: "bold" }}>Total Users Playing</div>
        </div>
        <div
          style={{
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="back"
          onClick={() => props.click()}
        >
          <div style={{ fontWeight: "bold", fontSize: 50 }}>{am[0]}</div>

          <div style={{ fontWeight: "bold" }}>Least hit</div>
        </div>
      </div>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Change Timings
          </Dropdown.Toggle>
          <button
            className="btn"
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "5px",
              marginLeft: "10px",
            }}
          >
            {time}
          </button>

          <button
            className="btn"
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "5px",
              marginLeft: "10px",
            }}
            onClick={handleOpenBalance}
          >
            {balance}
          </button>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => ValueUpdater(0.15)}>
              15 minutes
            </Dropdown.Item>
            <Dropdown.Item onClick={() => ValueUpdater(0.3)}>
              30 minutes
            </Dropdown.Item>
            <Dropdown.Item onClick={() => ValueUpdater(0.45)}>
              45 minutes
            </Dropdown.Item>

            <Dropdown.Item onClick={() => ValueUpdater(1)}>
              1 hour
            </Dropdown.Item>
            <Dropdown.Item onClick={() => ValueUpdater(2)}>
              2 hour
            </Dropdown.Item>
            <Dropdown.Item onClick={() => ValueUpdater(3)}>
              3 hour
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Please Enter Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Amount
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  placeholder="Amount"
                  onChange={(event) => setAmt(event.target.value)}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => ValSetter()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showsecond}
        onHide={handleCloseBalance}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Please Enter Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Amount
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  placeholder="Amount"
                  onChange={(event) => setAmtB(event.target.value)}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseBalance()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => changeMainBalance()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CurrentStatus;
/**/
