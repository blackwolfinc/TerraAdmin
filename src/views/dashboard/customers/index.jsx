import React, { useContext } from "react";
import CustomerTable from "./components/CustomerTable";
import { UserContext } from "context/UserContext";

const Customers = () => {
  const { user } = useContext(UserContext);

  const columnDataCustomer = [
    {
      Header: "FULLNAME",
      accessor: "name",
    },
    {
      Header: "EMAIL",
      accessor: "email",
    },
    {
      Header: "PHONE",
      accessor: "phone",
    },
  ];

  const superadminColumns = [
    {
      Header: "DELETE",
      accessor: "id",
    },
  ];

  const getColumns = () => {
    if (user?.role === "SUPER ADMIN") {
      return [...columnDataCustomer, ...superadminColumns];
    }

    return columnDataCustomer;
  };

  return (
    <div className="mt-3">
      <CustomerTable columnsData={getColumns()} />
    </div>
  );
};

export default Customers;
