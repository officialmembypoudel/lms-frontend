import React from "react";

import { Route, Routes } from "react-router";
import Dashboard from "../pages/Dashboard";
import Layout from "./Layout";
import Transactions from "../pages/Transactions";
import Members from "../pages/Members";
import Login from "../pages/Login";
import Register from "../pages/Register";

const PageRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/members" element={<Members />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default PageRoutes;
