import React from "react";
import userData from "./userData.json";
import UserTable from "./components/UserTable";

const Users = () => {
  const columnDataUser = [
    {
      Header: "USERNAME",
      accessor: "username",
    },
    {
      Header: "ROLE",
      accessor: "role",
    },
    {
      Header: "EDIT",
      accessor: "",
    },
    {
      Header: "DELETE",
      accessor: "",
    },
  ];

  return (
    <div className="mt-3">
      <UserTable columnsData={columnDataUser} tableData={userData} />
    </div>
  );
};

export default Users;
