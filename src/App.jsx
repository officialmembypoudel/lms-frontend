import React from "react";
import { BrowserRouter } from "react-router";
import PageRoutes from "./routes/Routes";
import AuthProvider from "./context/AuthContext";
import MembersProvider from "./context/MembersContext";
import { ToastContainer } from "react-toastify";
import NotificationContainer from "./components/common/Notification";

const App = () => {
  return (
    <NotificationContainer>
      <AuthProvider>
        <MembersProvider>
          <BrowserRouter>
            <PageRoutes />
          </BrowserRouter>
        </MembersProvider>
      </AuthProvider>
      <ToastContainer />
    </NotificationContainer>
  );
};

export default App;
