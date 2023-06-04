import React from "react";
import Table from './component/GalleryTable'
import galleryData from './gallery.json'

const Gallery = () => {

   const columnDataGallery = [
    {
      Header: "TITLE",
      accessor: "title",
    },
    {
      Header: "IMAGE",
      accessor: "image",
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
        tableData={galleryData}   
      />
    </div>
  )
};

export default Gallery;
