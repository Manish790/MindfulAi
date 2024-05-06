import React from 'react'
import { NavLink } from 'react-router-dom'
import useMediaQuery from "@mui/material/useMediaQuery";
const Sidebar = ({ item, index, path }) => {
  const isSmallScreen = useMediaQuery("(max-width:640px)");
  return (
    <div
      key={index}
      className={`${
        isSmallScreen
          ? "p-3 hover:bg-gray-700 text-[1rem] rounded-full hover:text-white"
          : "p-3 hover:bg-gray-700 text-[1.6rem] rounded-full"
      }`}
    >
      <NavLink
        to={item.path}
        className={`flex items-center justify-start w-full ${
          path === item.path ? "text-blue-500" : ""
        }`}
      >
        {item.icon}
        <p className="ml-2">{item.title}</p>
      </NavLink>
    </div>
  );
}

export default Sidebar
