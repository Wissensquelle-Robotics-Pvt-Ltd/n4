import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
// import { Link } from "react-router-dom";
import "./Navbar.css";
// import { useHistory } from "react-router-dom";
import DrawerToggleButton from "./SideDrawer/DrawerToggleButton";
function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  // console.log(props.select);

  const [reportsback, setReportsback] = useState("");
  // let history = useHistory();
  const showSidebar = () => setSidebar(!sidebar);
  const back = () => {};
  return (
    <header className="toolbar">
      <nav className="toolbar_navigation">
        <div className="toolbar_logo">
          <DrawerToggleButton click={props.DrawerClickHandler} />
        </div>
      </nav>
      <button onClick={() => props.select()} className="btn btn-dark">
        Back
      </button>
    </header>
  );
}

export default Navbar;
