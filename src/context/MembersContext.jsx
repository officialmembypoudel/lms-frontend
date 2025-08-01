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
      const response = await fetch("http://localhost:5003/api/members", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
    if (user?.role == "Member") {
      setMembers([]);
    } else if (user) {
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
        setMembers,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
};

export default MembersProvider;
