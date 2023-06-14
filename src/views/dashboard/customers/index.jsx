import React from "react";
import CustomerTable from "./components/CustomerTable";

const Customers = () => {
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

  return (
    <div className="mt-3">
      <CustomerTable columnsData={columnDataCustomer} />
    </div>
  );
};

export default Customers;
