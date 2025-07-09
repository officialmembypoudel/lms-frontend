import React from "react";

import { Route, Routes } from "react-router";
import Dashboard from "../pages/Dashboard";
import Layout from "./Layout";
import Transactions from "../pages/Transactions";
import Members from "../pages/Members";

const PageRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/members" element={<Members />} />
      </Route>
    </Routes>
  );
};

export default PageRoutes;
