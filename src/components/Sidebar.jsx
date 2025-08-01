import React, { useState } from "react";
import { NavLink } from "react-router";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Sidebar = () => {
  const { user, setUser } = useAuth();
  const [showSidebar, setshowSidebar] = useState(false);

  const activeStyle = ({ isActive }) => {
    return isActive
      ? {
          backgroundColor: "#49516F",
          color: "white",
        }
      : {};
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleNavClick = () => {
    // Close sidebar on mobile when navigation link is clicked
    if (window.innerWidth < 1024) {
      setshowSidebar(false);
    }
  };

  const sidebar = (className) => {
    return (
      <nav
        style={{ position: "fixed" }}
        className={
          " w-[250px] h-[100vh] bg-gray-100 px-2 flex-col justify-between " +
          className
        }
      >
        <div>
          <div className="flex justify-between items-center mb-4 p-4">
            <h3 className="text-3xl font-bold">LMS</h3>
            {/* Close button for mobile */}
            <button
              onClick={() => setshowSidebar(false)}
              className="lg:hidden p-1 hover:bg-gray-200 rounded"
            >
              <IoClose size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <NavLink
              style={activeStyle}
              className="p-4 text-lg rounded-lg hover:bg-[#8EA4D2] hover:text-white"
              to="/"
              onClick={handleNavClick}
            >
              Dashboard
            </NavLink>

            <NavLink
              style={activeStyle}
              className="p-4 text-lg rounded-lg hover:bg-[#8EA4D2] hover:text-white"
              to="/transactions"
              onClick={handleNavClick}
            >
              Transactions
            </NavLink>

            {user?.role !== "Member" && (
              <NavLink
                style={activeStyle}
                className="p-4 text-lg hover:bg-[#8EA4D2] hover:text-white rounded-lg"
                to="/members"
                onClick={handleNavClick}
              >
                Members
              </NavLink>
            )}
            <NavLink
              style={activeStyle}
              className="p-4 text-lg hover:bg-[#8EA4D2] hover:text-white rounded-lg"
              to="/profile"
              onClick={handleNavClick}
            >
              Profile
            </NavLink>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mb-4 border border-red-400 text-red-400 p-2 rounded-lg font-semibold flex justify-center items-center gap-2 cursor-pointer hover:bg-red-50"
        >
          <FiLogOut /> Logout
        </button>
      </nav>
    );
  };

  return (
    <>
      {sidebar("hidden lg:flex")}

      <button
        onClick={() => setshowSidebar(!showSidebar)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-lg"
      >
        <GiHamburgerMenu size={24} />
      </button>

      {/* Mobile sidebar with backdrop */}
      {showSidebar && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-transparent bg-opacity-50 z-40"
            onClick={() => setshowSidebar(false)}
          ></div>

          {/* Mobile sidebar */}
          {sidebar("lg:hidden flex z-50")}
        </>
      )}
    </>
  );
};

export default Sidebar;
