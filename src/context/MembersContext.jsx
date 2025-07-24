import React, { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../components/common/Loader";

export const MembersContext = createContext();

const MembersProvider = ({ children }) => {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5003/api/members", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (responseData.success) {
        setMembers(responseData.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMembers();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <MembersContext.Provider
      value={{
        members,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
};

export default MembersProvider;
