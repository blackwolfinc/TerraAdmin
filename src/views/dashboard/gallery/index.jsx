import React from "react";
import Table from "./component/GalleryTable";

const Gallery = () => {
  const columnDataGallery = [
    {
      Header: "TITLE",
      accessor: "title",
    },
    {
      Header: "DESCRIPTION",
      accessor: "description",
    },
    {
      Header: "IMAGE",
      accessor: "galleryImages",
      disableSortBy: true,
    },
    {
      Header: "EDIT",
      accessor: "",
      disableSortBy: true,
    },
    {
      Header: "DELETE",
      accessor: "",
      disableSortBy: true,
    },
  ];

  return (
    <div className="mt-3 rounded-full bg-white">
      <Table columnsData={columnDataGallery} />
    </div>
  );
};

export default Gallery;
