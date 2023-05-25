import React from "react";
import ProductTable from "./components/ProductTable";
import productData from "./productData.json";

const Products = () => {
  const columnDataProduct = [
    {
      Header: "IMAGES",
      accessor: "images",
    },
    {
      Header: "TITLE",
      accessor: "title",
    },
    {
      Header: "DETAIL",
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
      <ProductTable columnsData={columnDataProduct} tableData={productData} />
    </div>
  );
};

export default Products;
