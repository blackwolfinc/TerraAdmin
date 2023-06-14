import React from "react";
import ProductTable from "./components/ProductTable";

const Products = () => {
  const columnDataProduct = [
    {
      Header: "IMAGES",
      accessor: "productImageSlides",
    },
    {
      Header: "TITLE",
      accessor: "title",
    },
    {
      Header: "CATEGORY",
      accessor: "category",
    },
    {
      Header: "LINK",
      accessor: "",
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
      <ProductTable columnsData={columnDataProduct} />
    </div>
  );
};

export default Products;
