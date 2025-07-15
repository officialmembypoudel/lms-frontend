import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { userInfo } from "../userInfo";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const information = useContext(AuthContext);

  console.log("information", information);

  if (information.loading) {
    return <div>loading...</div>;
  }

  if (information?.user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoutes;
