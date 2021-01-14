import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import Cards from "./components/Cards";
import Analytics from "./components/Analytics";
import Database from "./components/Database";
import Navbar from "./components/Navbar";
import { Card, Button, Table, Container } from "react-bootstrap";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import CurrentStatus from "./CurrentStatus";
import OfflineChips from "./components/OfflineChips";
import Reports from "./components/Reports";
import Withdrawls from "./components/Withdrawls";
import HitReport from "./components/HitReport";
import Login from "./components/Login";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "antd/dist/antd.css";

function App() {
  const [drawer, ChangeDrawer] = useState(false);
  const [SelectedItem, setSelectedItem] = useState(1);
  const [isUser, setIsUser] = useState(false);

  const dispatch = useDispatch();

  // useEffect to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // console.log(user);
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });
    // clean up the state
    return () => unsubscribe();
  }, [SelectedItem]);

  const { user } = useSelector((state) => ({ ...state }));
  // console.log(user);

  useEffect(() => {
    if (user && user.token) {
      // console.log("ture");
      setIsUser(true);
    } else {
      // console.log("false");
      setIsUser(false);
    }
  }, [user]);

  function DrawerClickHandler() {
    ChangeDrawer(!drawer);
  }
  function BackdropClickHandler() {
    ChangeDrawer(false);
  }
  function setReports() {
    setSelectedItem(6);
  }
  function setHit() {
    setSelectedItem(7);
  }
  function setSelection(x) {
    setSelectedItem(x);
    ChangeDrawer(false);
  }
  function keepTrack() {
    if (SelectedItem == 6) {
      setSelectedItem(3);
    } else if (SelectedItem == 7) {
      setSelectedItem(1);
    } else {
      //alert("do nothing");
    }
  }

  let sideDrawer;
  let one;
  let two, three, four, five, six, seven;
  let backdrop;
  if (drawer == true) {
    backdrop = <Backdrop click={BackdropClickHandler} />;
  }
  if (SelectedItem == 1) {
    one = <CurrentStatus click={setHit} />;
  } else if (SelectedItem == 2) {
    two = <Database />;
  } else if (SelectedItem == 3) {
    three = <OfflineChips click={setReports} />;
  } else if (SelectedItem == 4) {
    four = <Reports />;
  } else if (SelectedItem == 5) {
    six = <Withdrawls />;
  } else if (SelectedItem == 7) {
    seven = <HitReport />;
  } else {
    five = <Analytics />;
  }
  return (
    <>
      <ToastContainer />

      {!isUser && <Login />}

      {isUser && (
        <div style={{ alignItems: "center" }}>
          <div style={{ height: "100%" }}>
            <Navbar
              DrawerClickHandler={DrawerClickHandler}
              select={keepTrack}
            />

            <SideDrawer
              show={drawer}
              select={setSelection}
              selected={SelectedItem}
            />

            {backdrop}
          </div>

          {one}
          {two}
          {three}
          {four}

          {five}
          {six}
          {seven}

          {/* making the login router  */}
        </div>
      )}
    </>
    // <Analytics />

    /*  <Database />
      <div className="container">
        <Cards
          d-flex
          justify-content-center
          name="register"
          title="Register"
          brief="Register or deposit funds in users account."
        />
        <Cards
          d-flex
          justify-content-center
          name="analytics"
          title="Analytics"
          brief="Have a look at the analytics of the game."
        />
        <Cards
          d-flex
          justify-content-center
          name="database-storage"
          title="Database"
          brief="Have a look at the database of users."
        />
      </div>
      <Database /> */
  );
}

export default App;
