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
import { HiTrash } from "react-icons/hi";
import GalleryAddEdit from "./GalleryAddEdit";
import GalleryDelete from "./GalleryDelete";

const  PartnerTable = (props) => {
    const { columnsData, tableData } = props;

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);

    const defaultValue = {
        title: '',
        image:[]
    }

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
    const [editGalleryData, setEditGalleryData] = useState(null);
    const [deleteGalleryData, setDeleteGalleryData] = useState(null);

    React.useEffect(() => {
        if (isOpen) return;

        setEditGalleryData(null);
    }, [isOpen]);

    const handleSubmitGallery = (value) => {
        console.log("Submit Gallery", value);
    };

    const handleEditGallery = (value) => {
        setEditGalleryData(value);
        onOpen();
    };

    const handleDeleteGallery = (value) => {
        if (!value) {
          if (typeof value === "object") {
              setDeleteGalleryData(value);
          } else {
              console.log("Delete Gallery", value);
              setDeleteGalleryData(null);
          }
        } else {
          setDeleteGalleryData(null);
        }
    };

    useEffect(() => {
        if (isOpen) return;

        setEditGalleryData(null);
    }, [isOpen]);

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white uppercase">
          gallery list
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
                      column.Header === "EDIT" || column.Header === "DELETE"
                        ? "w-[80px]"
                        : "pr-14"
                    } border-b border-gray-200 pb-[10px] text-start dark:!border-navy-700`}
                  >
                    <div
                      className={`${
                        column.Header === "EDIT" || column.Header === "DELETE"
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
                        <p className="pr-14 text-sm font-bold text-navy-700 dark:text-white flex flex-row gap-5">
                          {cell.value.slice(0,5).map((value) => {
                            return (
                              <Image
                                boxSize="4rem"
                                objectFit="cover"
                                src={cell.value[0]}
                                alt={`image-${index}`}
                              />
                            )
                          })}
                        </p>
                      );
                    } else if (cell.column.Header.toUpperCase() === "TITLE") {
                      data = (
                        <p className="pr-14 text-sm font-semibold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }else if (cell.column.Header.toUpperCase() === "EDIT") {
                      data = (
                        <div className="flex justify-center text-gray-900 dark:text-white">
                          <Button
                            colorScheme="purple"
                            size="sm"
                            onClick={() => handleEditGallery(cell.row.original)}
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
                            onClick={() => handleDeleteGallery(cell.row.original)}
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
      <GalleryAddEdit
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitGallery}
        defaultValue={editGalleryData ? editGalleryData : defaultValue}
      />
      <GalleryDelete
        data={deleteGalleryData}
        onSubmit={handleDeleteGallery}
      />
    </Card>
  );
};

export default PartnerTable;
