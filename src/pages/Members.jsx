import { useContext, useMemo } from "react";
import Table from "../components/common/Table";
import Card from "../components/common/Card";
import { MembersContext } from "../context/MembersContext";
import useAuth from "../hooks/useAuth";
import { FiAlertTriangle } from "react-icons/fi";

const getMemberColumns = ({ updateRole, user }) => {
  return [
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
      renderDetail: (row) => {
        return (
          <>
            {user.role === "Admin" ? (
              <div className="px-4">
                {row?.role === "Member" ? (
                  <button
                    onClick={() => updateRole(row?._id)}
                    className="w-full p-2 px-4 rounded-lg cursor-pointer bg-green-500 text-white hover:bg-green-400"
                  >
                    Make Staff
                  </button>
                ) : row.role === "Admin" ? (
                  row.role
                ) : (
                  <button
                    onClick={() => updateRole(row?._id)}
                    className="w-full p-2 px-4 rounded-lg cursor-pointer bg-red-500 text-white hover:bg-red-400"
                  >
                    Make Member
                  </button>
                )}
              </div>
            ) : (
              row.role
            )}
          </>
        );
      },
    },
  ];
};

const Members = () => {
  const { members, setMembers } = useContext(MembersContext);
  const { user } = useAuth();

  const handleUpdateMemberRole = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5003/api/members/${userId}/change-role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();

      if (responseData.success) {
        console.log(responseData);

        const updatedMembers = members.map((member) => {
          if (member?._id === userId) {
            return responseData?.data;
          }

          return member;
        });

        setMembers(updatedMembers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(
    () =>
      getMemberColumns({
        updateRole: handleUpdateMemberRole,
        user,
      }),
    [user]
  );

  if (user?.role === "Member") {
    return (
      <div className="h-screen bg-red-50 flex flex-col gap-8 items-center justify-center  text-red-600">
        <FiAlertTriangle size={50} />
        <h3 className="text-xl">You are not authorized to access this page!</h3>
      </div>
    );
  }

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
