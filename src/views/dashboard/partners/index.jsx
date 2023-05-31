import Table from './component/PartnerTable'
import React from "react";
import partnerData from './partners.json'

const Partners = () => {

  const columnDataUser = [
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
      <Table columnsData={columnDataUser} tableData={partnerData} />
    </div>
  );
};

export default Partners;
