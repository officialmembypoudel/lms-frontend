import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

const NotificationContainer = ({ children }) => {
  const [message, setMessage] = useState(null);

  const toast = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  return (
    <NotificationContext.Provider
      value={{
        toast,
      }}
    >
      {message && (
        <div className="w-[350px] absolute top-8 right-8 bg-green-200 rounded-lg p-2 py-4 shadow">
          {message}
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContainer;
