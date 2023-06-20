import React, { useMemo } from "react";
import { Button, Tag, TagLabel } from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import NoImage from "assets/img/no-image.jpg";
import Card from "components/card";
import { Spinner } from "@chakra-ui/react";
import ModalInputPromo from "./ModalInputPromo";
import ModalDeletePromo from "./ModalDeletePromo";
import { usePromoDataQuery } from "services/promo/get-promo";
import { useCreatePromoMutation } from "services/promo/post-promo";
import { useEditPromoMutation } from "services/promo/patch-promo";
import { useDeletePromoMutation } from "services/promo/delete-promo";
import { useUploadImagesPromoMutation } from "services/promo/post-promo-image";
import { toast } from "react-toastify";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Pagination from "components/pagination";

const columnsData = [
  {
    Header: "IMAGE",
    accessor: "image",
    disableSortBy: true,
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
    id: "edit",
    Header: "EDIT",
    accessor: "id",
    disableSortBy: true,
  },
  {
    id: "delete",
    Header: "DELETE",
    accessor: "id",
    disableSortBy: true,
  },
];

const PromoTable = () => {
  // state
  const [isModalCreateOpen, setIsModalCreateOpen] = React.useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  const [modalEditValue, setModalEditValue] = React.useState(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = React.useState(false);
  const [deletedValue, setDeletedValue] = React.useState(null);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = React.useState(1);

  // api data
  const { mutate: createPromo, isLoading: createPromoIsLoading } =
    useCreatePromoMutation();
  const { mutate: uploadPromoImage, isLoading: uploadPromoImageIsLoading } =
    useUploadImagesPromoMutation();
  const { mutate: editPromo, isLoading: editPromoIsLoading } =
    useEditPromoMutation();
  const { mutate: deletePromo } = useDeletePromoMutation();
  const {
    data: promoData,
    isLoading: promoIsLoading,
    refetch: refetchPromo,
  } = usePromoDataQuery({
    page: currentPage,
    paginate: pageSize,
  });
  const columns = columnsData;
  const data = useMemo(() => promoData?.data.datas || [], [promoData]);

  const handleOpenEdit = (id) => {
    const selectedData = data.find((item) => item.id === id);
    setModalEditValue(selectedData);
    setIsModalEditOpen(true);
  };

  const handleOpenDelete = (id) => {
    const selectedData = data.find((item) => item.id === id);
    setDeletedValue(selectedData);
    setIsModalDeleteOpen(true);
  };

  const handlePostPromo = (data) => {
    const postData = {
      title: data?.title,
      description: data?.description,
      category: data?.category,
    };

    createPromo(postData, {
      onSuccess: (res) => {
        toast.success("Berhasil menambahkan promo.");
        refetchPromo();

        const { id } = res.data.data;
        if (data?.image) {
          handleUploadPromoImage(id, data?.image);
          return;
        }

        setIsModalCreateOpen(false);
      },
      onError: () => {
        toast.error("Gagal menambahkan promo.");
      },
    });
  };

  const handleUploadPromoImage = (id, image) => {
    const formData = new FormData();
    formData.append("image", image);

    uploadPromoImage(
      { id: id, data: formData },
      {
        onSuccess: () => {
          toast.success("Berhasil menambahkan gambar promo.");
          refetchPromo();
        },
        onError: () => {
          toast.error("Gagal menambahkan gambar promo.");
        },
        onSettled: () => {
          setIsModalCreateOpen(false);
        },
      }
    );
  };

  const handleEditPromo = (data) => {
    const editData = {
      title: data?.title,
      description: data?.description,
      category: data?.category,
    };

    editPromo(
      { id: modalEditValue?.id, data: editData },
      {
        onSuccess: () => {
          toast.success("Berhasil mengubah promo.");
          refetchPromo();

          if (data.image !== modalEditValue?.image) {
            handleUploadPromoImage(modalEditValue?.id, data?.image);
            return;
          }

          setIsModalEditOpen(false);
        },
        onError: () => {
          toast.error("Gagal mengubah promo.");
        },
      }
    );
  };

  const handleDeletePromo = (id) => {
    deletePromo(id, {
      onSuccess: () => {
        toast.success("Berhasil menghapus promo.");
        refetchPromo();
      },
      onError: () => {
        toast.error("Gagal menghapus promo.");
      },
      onSettled: () => {
        setIsModalDeleteOpen(false);
      },
    });
  };

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  return (
    <>
      {/* Create New Modal */}
      <ModalInputPromo
        isOpen={isModalCreateOpen}
        onSubmit={handlePostPromo}
        isLoading={createPromoIsLoading || uploadPromoImageIsLoading}
        onClose={() => setIsModalCreateOpen(false)}
      />
      {/* Edit Modal */}
      <ModalInputPromo
        title="Edit Promo"
        isOpen={isModalEditOpen}
        isLoading={editPromoIsLoading}
        onClose={() => setIsModalEditOpen(false)}
        onSubmit={handleEditPromo}
        initialValue={modalEditValue}
      />
      {/* Delete Modal */}
      <ModalDeletePromo
        title={`${deletedValue?.title || ""}`}
        isOpen={isModalDeleteOpen}
        onSubmit={() => handleDeletePromo(deletedValue?.id)}
        onClose={() => setIsModalDeleteOpen(false)}
      />
      <Card extra={"mt-3 w-full sm:overflow-auto p-4 pb-10"}>
        <div className="mb-4 flex items-center justify-between pb-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            LIST PROMO
          </div>
          <button
            className="linear rounded-xl bg-brand-500 px-8 py-2 text-center text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
            onClick={() => setIsModalCreateOpen(true)}
          >
            ADD
          </button>
        </div>
        {promoIsLoading && (
          <div className="my-4 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {!promoIsLoading && data?.length === 0 && (
          <div className="my-4 flex items-center justify-center">
            <div className="text-lg font-bold text-gray-400">
              Belum ada data promo
            </div>
          </div>
        )}
        {!promoIsLoading && data?.length > 0 && (
          <div className="h-full overflow-x-scroll xl:overflow-x-hidden">
            <table
              {...getTableProps()}
              className="w-full"
              variant="simple"
              color="gray-500"
              mb="24px"
              table-layout="auto"
            >
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={index}
                        className={`border-b border-gray-200 pb-[10px] text-center dark:!border-navy-700 ${
                          column.Header === "EDIT" || column.Header === "DELETE"
                            ? "w-20 px-6"
                            : ""
                        } ${
                          column.Header === "TITLE" ||
                          column.Header === "CREATOR" ||
                          column.Header === "CATEGORY"
                            ? "min-w-[160px]"
                            : ""
                        } ${column.Header === "IMAGE" ? "w-40" : ""}`}
                      >
                        <div
                          className={`${
                            column.Header === "EDIT" ||
                            column.Header === "DELETE"
                              ? "justify-center"
                              : ""
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
                        let data = "";
                        if (cell.column.Header === "IMAGE") {
                          data = (
                            <div className="mr-14 flex aspect-video h-14 w-fit items-center justify-center overflow-hidden rounded-lg">
                              {!cell.value && (
                                <img
                                  src={NoImage}
                                  alt={`blog-${index}`}
                                  className="min-h-full min-w-full"
                                />
                              )}
                              {cell.value && (
                                <img
                                  src={`${process.env.REACT_APP_API_IMAGE}/${cell.value}`}
                                  alt={`blog-${index}`}
                                  className="min-h-full min-w-full"
                                />
                              )}
                            </div>
                          );
                        } else if (cell.column.Header === "TITLE") {
                          data = (
                            <p className="pr-14 text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "CREATOR") {
                          data = (
                            <p className="pr-14 text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value || "-"}
                            </p>
                          );
                        } else if (cell.column.Header === "CATEGORY") {
                          data = (
                            <Tag
                              size="sm"
                              borderRadius="full"
                              variant="solid"
                              colorScheme={
                                (cell.value === "SPECIAL" && "orange") ||
                                (cell.value === "STANDARD" && "blue")
                              }
                            >
                              <TagLabel>{cell.value}</TagLabel>
                            </Tag>
                          );
                        } else if (cell.column.Header === "EDIT") {
                          data = (
                            <div className="flex justify-center text-gray-900 dark:text-white">
                              <Button
                                colorScheme="purple"
                                size="sm"
                                onClick={() => handleOpenEdit(cell.value)}
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
                                onClick={() => handleOpenDelete(cell.value)}
                              >
                                <HiTrash />
                              </Button>
                            </div>
                          );
                        }
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={index}
                            className="pb-[16px] pt-[14px] sm:text-[14px]"
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
        )}
        <div className="mt-8 flex w-full justify-end">
          <Pagination
            totalPage={Math.ceil(promoData?.data?.total / pageSize)}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          />
        </div>
      </Card>
    </>
  );
};

export default PromoTable;
