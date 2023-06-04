import React from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { Button, Image, useDisclosure } from "@chakra-ui/react";
import Card from "components/card";
import { MdModeEditOutline } from "react-icons/md";
import { HiTrash, HiEye } from "react-icons/hi";
import ProductModal from "./ProductModal";
import ProductDelete from "./ProductDelete";
import { useProductsDataQuery } from "services/product/get-all-products";
import { useCreateProductMutation } from "services/product/post-product";
import { useUploadSketchProductMutation } from "services/product/post-sketch-product";
import { useUploadImagesProductMutation } from "services/product/post-images-product";
import { useDeleteProductMutation } from "services/product/delete-product";
import { useUpdateProductMutation } from "services/product/put-product";
import { toast } from "react-toastify";

const ProductTable = ({ columnsData }) => {
  const { data: showProducts, refetch: refetchShowProducts } =
    useProductsDataQuery();
  const { mutate: createProduct } = useCreateProductMutation();
  const { mutate: updateProduct } = useUpdateProductMutation();
  const { mutate: uploadSketchProduct } = useUploadSketchProductMutation();
  const { mutate: uploadImagesProduct } = useUploadImagesProductMutation();
  const { mutate: deleteProduct } = useDeleteProductMutation();

  const columns = React.useMemo(() => columnsData, [columnsData]);
  const data = React.useMemo(
    () => showProducts?.data?.data?.datas || [],
    [showProducts?.data?.data?.datas]
  );

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editProductData, setEditProductData] = React.useState(null);
  const [deleteProductData, setDeleteProductData] = React.useState(null);

  React.useEffect(() => {
    if (isOpen) return;

    setEditProductData(null);
  }, [isOpen]);

  const handleSubmitProduct = (value) => {
    const uploadImages = (response) => {
      return new Promise((resolve, reject) => {
        uploadImagesProduct(
          {
            id: response?.data?.data?.id,
            image: value.images,
          },
          {
            onSuccess: () => {
              toast.success("Upload images product success!");
              resolve();
            },
            onError: (err) => {
              toast.error("Upload images product failed!");
              reject(err);
            },
          }
        );
      });
    };

    const uploadSketch = (response) => {
      return new Promise((resolve, reject) => {
        uploadSketchProduct(
          {
            id: response?.data?.data?.id,
            image: value.sketch,
          },
          {
            onSuccess: () => {
              toast.success("Upload sketch product success!");
              resolve();
            },
            onError: (err) => {
              toast.error("Upload sketch product failed!");
              reject(err);
            },
          }
        );
      });
    };

    if (!value?.id) {
      // For Submit Create Product
      createProduct(
        {
          title: value.title,
          description: value.description,
          specification: value?.specification,
        },
        {
          onSuccess: (response) => {
            Promise.all([uploadSketch(response), uploadImages(response)])
              .then(() => {
                toast.success("Add product success!");
                refetchShowProducts();
              })
              .catch((err) => {
                // Error handling for uploadSketch or uploadImages
                toast.error("Add product failed!");
              });
          },
          onError: (err) => {
            toast.error("Create product failed!");
          },
        }
      );
    } else {
      // For Submit Update product
      updateProduct(
        {
          id: value.id,
          body: {
            title: value.title,
            description: value.description,
            specification: value?.specification,
          },
        },
        {
          onSuccess: (response) => {
            const promises = [];
            if (value.sketch) promises.push(uploadSketch(response));
            if (value.images.length > 0) promises.push(uploadImages(response));

            if (promises.length > 0) {
              Promise.all(promises)
                .then(() => {
                  toast.success("Update product success!");
                  refetchShowProducts();
                })
                .catch((err) => {
                  // Error handling for uploadSketch or uploadImages
                  toast.error("Update product failed!");
                });
            } else {
              toast.success("Update product success!");
              refetchShowProducts();
            }
          },
          onError: (err) => {
            toast.error("Update product failed!");
          },
        }
      );
    }
  };
  //   const uploadImages = (response) => {
  //     uploadImagesProduct(
  //       {
  //         id: response?.data?.data?.id,
  //         image: value.images,
  //       },
  //       {
  //         onSuccess: () => {
  //           toast.success("Upload images product success!");
  //         },
  //         onError: (err) => {
  //           toast.error("Upload images product failed!");
  //         },
  //       }
  //     );
  //   };

  //   const uploadSketch = (response) => {
  //     uploadSketchProduct(
  //       {
  //         id: response?.data?.data?.id,
  //         image: value.sketch,
  //       },
  //       {
  //         onSuccess: () => {
  //           toast.success("Upload sketch product success!");
  //         },
  //         onError: (err) => {
  //           toast.error("Upload sketch product failed!");
  //         },
  //       }
  //     );
  //   };

  //   if (!value?.id) {
  //     // For Submit Create Product
  //     createProduct(
  //       {
  //         title: value.title,
  //         description: value.description,
  //         specification: value?.specification,
  //       },
  //       {
  //         onSuccess: async (response) => {
  //           // uploadSketch(response);
  //           // uploadImages(response);
  //           await Promise.all([uploadSketch(response), uploadImages(response)]);
  //           toast.success("Add product success!");
  //           refetchShowProducts();
  //         },
  //         onError: (err) => {
  //           toast.error("Create product failed!");
  //         },
  //       }
  //     );
  //   } else {
  //     // For Submit Update product
  //     updateProduct(
  //       {
  //         id: value.id,
  //         body: {
  //           title: value.title,
  //           description: value.description,
  //           specification: value?.specification,
  //         },
  //       },
  //       {
  //         onSuccess: (response) => {
  //           if (value.sketch) uploadSketch(response);
  //           if (value.images.length > 0) uploadImages(response);
  //           toast.success("Update product success!");
  //           refetchShowProducts();
  //         },
  //         onError: (err) => {
  //           toast.error("Update product failed!");
  //         },
  //       }
  //     );
  //   }
  // };

  const handleEditProduct = (value) => {
    const newData = {
      id: value.id,
      title: value.title,
      description: value.description,
      specification: value.specification,
      sketch: value.image_denah_path,
      images: value.productImageSlides,
    };
    setEditProductData(newData);
    onOpen();
  };

  const handleDeleteProduct = (value) => {
    if (value) {
      if (typeof value === "object") {
        setDeleteProductData(value);
      } else {
        deleteProduct(value, {
          onSuccess: () => {
            refetchShowProducts();
            toast.success("Delete product success!");
          },
          onError: (err) => {
            toast.error("Delete product failed!");
          },
        });
        setDeleteProductData(null);
      }
    } else {
      setDeleteProductData(null);
    }
  };

  return (
    <Card extra="w-full pb-10 p-4 h-full">
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          LIST PRODUCT
        </div>
        <button
          onClick={onOpen}
          className="linear rounded-xl bg-brand-500 px-8 py-2 text-center text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
        >
          ADD
        </button>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className={`${
                      column.Header === "DETAIL" ||
                      column.Header === "EDIT" ||
                      column.Header === "DELETE"
                        ? "w-[80px]"
                        : "pr-14"
                    } ${
                      column.Header === "IMAGES" ? "w-[150px]" : ""
                    } border-b border-gray-200 pb-[10px] text-start dark:!border-navy-700`}
                  >
                    <div
                      className={`${
                        column.Header === "DETAIL" ||
                        column.Header === "EDIT" ||
                        column.Header === "DELETE"
                          ? "justify-center"
                          : "justify-between"
                      } flex w-full text-xs tracking-wide text-gray-600`}
                    >
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data;
                    if (cell.column.Header === "IMAGES") {
                      data = (
                        <p className="pr-14 text-sm font-semibold text-navy-700 dark:text-white">
                          <Image
                            boxSize="4rem"
                            objectFit="cover"
                            src={
                              cell?.value[0]
                                ? `${process.env.REACT_APP_API_IMAGE}/${cell?.value[0]?.image_path}`
                                : ""
                            }
                            alt={`image-${index}`}
                          />
                        </p>
                      );
                    } else if (cell.column.Header === "TITLE") {
                      data = (
                        <p className="pr-14 text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "DETAIL") {
                      data = (
                        <div className="flex justify-center text-gray-700 dark:text-white">
                          <Button
                            onClick={() =>
                              window.open(
                                `/product/${cell.row.original.id}`,
                                "_blank"
                              )
                            }
                            colorScheme="gray"
                            size="sm"
                          >
                            <HiEye />
                          </Button>
                        </div>
                      );
                    } else if (cell.column.Header === "EDIT") {
                      data = (
                        <div className="flex justify-center text-gray-900 dark:text-white">
                          <Button
                            colorScheme="purple"
                            size="sm"
                            onClick={() => handleEditProduct(cell.row.original)}
                          >
                            <MdModeEditOutline />
                          </Button>
                        </div>
                      );
                    } else if (cell.column.Header === "DELETE") {
                      data = (
                        <div className="flex justify-center text-red-500 dark:text-white">
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() =>
                              handleDeleteProduct(cell.row.original)
                            }
                          >
                            <HiTrash />
                          </Button>
                        </div>
                      );
                    }
                    return (
                      <td
                        className="pb-[10px] pt-[10px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ProductModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitProduct}
        defaultValue={editProductData}
      />
      <ProductDelete data={deleteProductData} onSubmit={handleDeleteProduct} />
    </Card>
  );
};

export default ProductTable;
