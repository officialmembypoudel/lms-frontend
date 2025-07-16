import React from "react";
import { NavLink } from "react-router";

const Sidebar = () => {
  const activeStyle = ({ isActive }) => {
    return isActive
      ? {
          backgroundColor: "#49516F",
          color: "white",
        }
      : {};
  };

  return (
    <nav
      style={{ position: "fixed" }}
      className=" w-[250px] h-[100vh] bg-gray-100 px-2"
    >
      <h3 className="text-3xl font-bold mb-4 p-4">LMS</h3>
      <div className="flex flex-col gap-2">
        <NavLink
          style={activeStyle}
          className="p-4 text-lg rounded-lg hover:bg-[#8EA4D2] hover:text-white"
          to="/"
        >
          Dashboard
        </NavLink>

        <NavLink
          style={activeStyle}
          className="p-4 text-lg rounded-lg hover:bg-[#8EA4D2] hover:text-white"
          to="/transactions"
        >
          Transactions
        </NavLink>

        <NavLink
          style={activeStyle}
          className="p-4 text-lg hover:bg-[#8EA4D2] hover:text-white rounded-lg"
          to="/members"
        >
          Members
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;
