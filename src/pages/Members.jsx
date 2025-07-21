import React, { useEffect, useState } from "react";
import Table from "../components/common/Table";
import Card from "../components/common/Card";

const columns = [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Phone",
    key: "phoneNumber",
  },
  {
    label: "Role",
    key: "role",
  },
];

const Members = () => {
  const [members, setMembers] = useState([]);

  const fetchTransactions = async () => {
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

      console.log(responseData);

      if (responseData.success) {
        setMembers(responseData.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <div className="p-4 px-8  mb-8 shadow">
        <h4 className="text-3xl font-semibold">Members</h4>
      </div>
      <div className="px-8">
        <Card customClass="bg-white border border-gray-300">
          <h5 className="text-2xl mb-4 font-bold">Library Users</h5>
          <Table columns={columns} data={members} />
        </Card>
      </div>
    </>
  );
};

export default Members;
