import Table from "./component/PartnerTable";
import React from "react";

const Partners = () => {
  const columnDataPartner = [
    {
      Header: "IMAGE",
      accessor: "image",
    },
    {
      Header: "TITLE",
      accessor: "title",
    },
    {
      Header: "LINK",
      accessor: "link",
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
    <div className="mt-3 rounded-full bg-white">
      <Table columnsData={columnDataPartner} />
    </div>
  );
};

export default Partners;
