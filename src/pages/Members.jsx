import { useContext } from "react";
import Table from "../components/common/Table";
import Card from "../components/common/Card";
import { MembersContext } from "../context/MembersContext";

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
  const { members } = useContext(MembersContext);

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
