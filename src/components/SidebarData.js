import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Current Game Status",
    path: "/",
    icon: <IoIcons.IoLogoGameControllerB />,
    cName: "nav-text",
  },
  {
    title: "Users",
    path: "/users",
    icon: <FaIcons.FaUserAlt />,
    cName: "nav-text",
  },
];
