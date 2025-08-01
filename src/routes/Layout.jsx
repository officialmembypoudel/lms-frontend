import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="lg:ml-[250px] min-h-screen bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
