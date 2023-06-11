import React from "react";
import Table from './component/GalleryTable'

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
      <Table
        columnsData={columnDataGallery}
      />
    </div>
  )
};

export default Gallery;
