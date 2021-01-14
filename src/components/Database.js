import React, { useEffect, useState } from "react";
import "./database.css";
import bar from "../assets/bar.svg";
import two from "../assets/two.svg";
import three from "../assets/three.svg";
import four from "../assets/four.svg";
import five from "../assets/five.svg";
import six from "../assets/six.svg";
import Dropdown from "./Dropdown_list";
import Firebase from "../firebase";
import "firebase/firestore";
import { CompassOutlined } from "@ant-design/icons";
import UserList from "./UsersList";
const dbh = Firebase.firestore();
var active, inactive, registered;

const date = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // x days ago

function Database() {
  const [active, setActive] = useState(0);
  const [inactive, setInactive] = useState(0);
  const [registered, setRegistered] = useState(0);

  const [select, setSelect] = useState("");

  useEffect(() => {
    // Update the document title using the browser API
    //    var docRef = dbh.collection("admin").doc("users");
    dbh
      .collection("database")
      //   .where('date', '>=', (startDate))
      //  .where('date','<=',toDate)

      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setRegistered(querySnapshot.size);
          //  alert(new Date())
          // alert(i)
        });
      })
      .catch(function (error) {
        alert(error);
      });

    dbh
      .collection("database")
      .where("lastplayed", "<", date)

      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          //  setLength(querySnapshot.size);

          setInactive(querySnapshot.size);
        });
      })
      .catch(function (error) {});
    setActive(registered - inactive);
  });
  // .then((querySnapshot) => {
  //    alert(querySnapshot.get("active"));
  // });
  return (
    <>
      {select && <UserList id={select} />}
      {!select && (
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
            className="back"
          >
            <div
              style={{ fontWeight: "bold", fontSize: 50, alignSelf: "center" }}
              id="registered"
              onClick={(e) => setSelect(e.target.id)}
            >
              {registered}
            </div>

            <div style={{ fontWeight: "bold" }}>Total Registered Users</div>
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
            <div
              style={{ fontWeight: "bold", fontSize: 50 }}
              id="active"
              onClick={(e) => setSelect(e.target.id)}
            >
              {active}
            </div>

            <div style={{ fontWeight: "bold" }}>Active Users</div>
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
          >
            <div
              style={{ fontWeight: "bold", fontSize: 50 }}
              id="inactive"
              onClick={(e) => setSelect(e.target.id)}
            >
              {inactive}
            </div>

            <div style={{ fontWeight: "bold" }}>Inactive Users</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Database;
