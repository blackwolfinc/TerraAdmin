import Table from './component/PartnerTable'
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
    <div className="mt-8 bg-white rounded-full">
      <Table columnsData={columnDataPartner} />
    </div>
  );
};

export default Partners;
