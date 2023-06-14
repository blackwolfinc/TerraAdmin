import React, { useEffect, useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "components/card";
import { Button, Image, useDisclosure } from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";
import { HiTrash, HiOutlineExternalLink } from "react-icons/hi";
import PartnerAddEdit from "./PartnerAddEdit";
import PartnerDelete from "./PartnerDelete";
import { usePartnerDataQuery } from "../../../../services/partner/get-all-partner";
import { useCreatePartnerMutation } from "../../../../services/partner/post-partner";
import { useCreatePartnerImageMutation } from "../../../../services/partner/post-partner-image";
import { useDeletePartnerMutation } from "../../../../services/partner/delete-partner";
import { useEditPartnerMutation } from "../../../../services/partner/patch-partner";
import { toast } from "react-toastify";

const PartnerTable = (props) => {
  const { columnsData } = props;

  const { data: partnerData, refetch: refetchShowPartner } =
    usePartnerDataQuery();

  const { mutate: createTitle } = useCreatePartnerMutation();
  const { mutate: uploadImage } = useCreatePartnerImageMutation();
  const { mutate: updateTitle } = useEditPartnerMutation();
  const { mutate: deletePartner } = useDeletePartnerMutation();

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(
    () => partnerData?.data?.data?.datas || [],
    [partnerData?.data?.data?.datas]
  );

  const defaultValue = {
    title: "",
    link: "",
    image: [],
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
  const [editPartnerData, setEditPartnerData] = useState(null);
  const [deletePartnerData, setDeletePartnerData] = useState(null);

  useEffect(() => {
    if (isOpen) return;

    setEditPartnerData(null);
  }, [isOpen]);

  const handleEditPartner = (value) => {
    setEditPartnerData(value);
    onOpen();
  };

  const handleDeletePartner = (value) => {
    if (value) {
      if (typeof value === "object") {
        setDeletePartnerData(value);
      } else {
        deletePartner(value, {
          onSuccess: () => {
            refetchShowPartner();
            toast.success("Delete Partner success!");
          },
          onError: (err) => {
            toast.error("Delete Partner failed!");
          },
        });
        setDeletePartnerData(null);
      }
    } else {
      setDeletePartnerData(null);
    }
  };

  const AddSubmit = ({ title, link, image }) => {
    createTitle(
      {
        title: title,
        link: link,
      },
      {
        onSuccess: (response) => {
          uploadImage(
            {
              id: response.data.data.id,
              image: image,
            },
            {
              onSuccess: () => {
                onClose();
                refetchShowPartner();
                toast.success("Edit partner success!");
                // resolve();
              },
              onError: (err) => {
                console.log(err);
                toast.error("Upload Image partner failed!");
                // reject(err);
              },
            }
          );
        },
        onError: (err) => {
          toast.error("Create partner failed!");
        },
      }
    );
  };

  const EditSubmit = ({ id, title, link, image }) => {
    const isUploadImage = typeof image === "string";
    updateTitle(
      {
        id: id,
        title: title,
        link: link,
      },
      {
        onSuccess: () => {
          if (!isUploadImage) {
            const formData = new FormData();
            formData.append("image", image[0]);
            uploadImage(
              {
                id: id,
                image: formData,
              },
              {
                onSuccess: () => {
                  onClose();
                  refetchShowPartner();
                  toast.success("Create partner success!");
                  // resolve();
                },
                onError: (err) => {
                  console.log(err);
                  toast.error("Create partner failed!");
                  // reject(err);
                },
              }
            );
          } else {
            onClose();
            refetchShowPartner();
            toast.success("Create partner success!");
          }
        },
        onError: (err) => {
          toast.error("Create partner failed!");
        },
      }
    );
  };

  useEffect(() => {
    if (isOpen) return;

    setEditPartnerData(null);
  }, [isOpen]);

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold uppercase text-navy-700 dark:text-white">
          List Partner
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
                      column.Header === "EDIT" ||
                      column.Header === "LINK" ||
                      column.Header === "DELETE"
                        ? "w-[80px]"
                        : "pr-14"
                    } border-b border-gray-200 pb-[10px] text-start dark:!border-navy-700`}
                  >
                    <div
                      className={`${
                        column.Header === "EDIT" ||
                        column.Header === "LINK" ||
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
                    if (cell.column.Header.toUpperCase() === "IMAGE") {
                      data = (
                        <p className="pr-14 text-sm font-bold text-navy-700 dark:text-white">
                          <Image
                            boxSize="4rem"
                            objectFit="cover"
                            src={`${process.env.REACT_APP_API_IMAGE}/${cell.value}`}
                            alt={`image-${index}`}
                          />
                        </p>
                      );
                    } else if (cell.column.Header.toUpperCase() === "TITLE") {
                      data = (
                        <p className="pr-14 text-sm font-semibold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header.toUpperCase() === "LINK") {
                      data = (
                        <div className="flex justify-center text-gray-700 dark:text-white">
                          <Button
                            colorScheme="gray"
                            size="sm"
                            onClick={() => handleEditPartner(cell.row.original)}
                          >
                            <HiOutlineExternalLink />
                          </Button>
                        </div>
                      );
                    } else if (cell.column.Header.toUpperCase() === "EDIT") {
                      data = (
                        <div className="flex justify-center text-gray-900 dark:text-white">
                          <Button
                            colorScheme="purple"
                            size="sm"
                            onClick={() => handleEditPartner(cell.row.original)}
                          >
                            <MdModeEditOutline />
                          </Button>
                        </div>
                      );
                    } else if (cell.column.Header.toUpperCase() === "DELETE") {
                      data = (
                        <div className="flex justify-center text-red-500 dark:text-white">
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() =>
                              handleDeletePartner(cell.row.original)
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
      <PartnerAddEdit
        isOpen={isOpen}
        onClose={onClose}
        defaultValue={editPartnerData ? editPartnerData : defaultValue}
        addSubmit={AddSubmit}
        editSubmit={EditSubmit}
      />
      <PartnerDelete data={deletePartnerData} onSubmit={handleDeletePartner} />
    </Card>
  );
};

export default PartnerTable;
