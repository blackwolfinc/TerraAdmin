import React from "react";
import UserTable from "./components/UserTable";
import { UserContext } from "context/UserContext";

const Users = () => {
  const { user } = React.useContext(UserContext);

  const columnDataUser = [
    {
      Header: "FULLNAME",
      accessor: "name",
    },
    {
      Header: "EMAIL",
      accessor: "email",
    },
    {
      Header: "ROLE",
      accessor: "role",
    },
  ];

  const columnAction = [
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
      <UserTable
        columnsData={
          user.role === "SUPER ADMIN"
            ? columnDataUser.concat(columnAction)
            : columnDataUser
        }
        authUser={user}
      />
    </div>
  );
};

export default Users;
