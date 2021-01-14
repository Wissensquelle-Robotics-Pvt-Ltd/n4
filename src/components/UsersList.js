import React, { useState, useEffect } from "react";
import Firebase from "../firebase";
const date = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // x days ago

const dbh = Firebase.firestore();

function UsersList(props) {
  const [regisDoc, setRegisDoc] = useState([]);
  const [actDoc, setActDoc] = useState([]);
  const [inactDoc, setInactDoc] = useState([]);
  //   console.log(props.id);
  useEffect(() => {
    dbh
      .collection("database")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          //   console.log(doc.data());
          setRegisDoc((regisDoc) => [...regisDoc, doc.data()]);
          //   console.log(regisDoc);
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
          setInactDoc((inactDoc) => [...inactDoc, doc.data()]);
        });
      })
      .catch(function (error) {});
    //   setActive(registered - inactive);

    // console.log(regisDoc);
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      {props.id === "registered" && <h1>Registered User List</h1>}
      {props.id === "active" && <h1>Active User List</h1>}
      {props.id === "inactive" && <h1>Inactive User List</h1>}

      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Mobile No.</th>
            <th scope="col">Amount</th>
            <th scope="col">Last Played</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>

            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
