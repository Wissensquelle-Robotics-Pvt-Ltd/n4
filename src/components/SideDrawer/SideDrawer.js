import React from "react";
import "./SideDrawer.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { LogoutOutlined } from "@ant-design/icons";

function SideDrawer(props) {
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  // console.log(user.email);
  let history = useHistory();
  let drawerClasses = "side-drawer";
  if (props.show == true) {
    drawerClasses = "side-drawer open";
  }

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: "null",
    });
    toast.success(`Logged Out Successfully`);
    // history.push("/login");
  };

  return (
    <nav className={drawerClasses}>
      <ul>
        <li
          className={props.selected == 1 ? "list_selected" : "list_unselected"}
          onClick={() => props.select(1)}
        >
          Current Game Status
        </li>
        <li
          className={props.selected == 2 ? "list_selected" : "list_unselected"}
          onClick={() => props.select(2)}
        >
          Users
        </li>
        <li
          className={props.selected == 3 ? "list_selected" : "list_unselected"}
          onClick={() => props.select(3)}
        >
          Offline Chips
        </li>
        <li
          className={props.selected == 4 ? "list_selected" : "list_unselected"}
          onClick={() => props.select(4)}
        >
          Reports
        </li>
        <li
          className={props.selected == 5 ? "list_selected" : "list_unselected"}
          onClick={() => props.select(5)}
        >
          Withdrawl Requests
        </li>
        {user && (
          <li
            className={
              props.selected == 5 ? "list_selected" : "list_unselected"
            }
            onClick={logout}
            icon={<LogoutOutlined />}
          >
            Logout
          </li>
        )}
      </ul>
    </nav>
  );
}

export default SideDrawer;
