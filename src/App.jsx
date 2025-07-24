import React from "react";
import { BrowserRouter } from "react-router";
import PageRoutes from "./routes/Routes";
import AuthProvider from "./context/AuthContext";
import MembersProvider from "./context/MembersContext";

const App = () => {
  return (
    <AuthProvider>
      <MembersProvider>
        <BrowserRouter>
          <PageRoutes />
        </BrowserRouter>
      </MembersProvider>
    </AuthProvider>
  );
};

export default App;
