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
import PartnerAddEdit from "./PartnerAddEdit";
import UserDelete from "./PartnerDelete";

const  PartnerTable = (props) => {
    const { columnsData, tableData } = props;

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);

    const defaultValue = {
        title: '',
        link: '',
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
    const [editPartnerData, setEditPartnerData] = useState(null);
    const [deletePartnerData, setDeletePartnerData] = useState(null);

    React.useEffect(() => {
        if (isOpen) return;

        setEditPartnerData(null);
    }, [isOpen]);

    const handleSubmitPartner = (value) => {
        console.log("Submit Partnrt", value);
    };

    const handleEditPartner = (value) => {
        setEditPartnerData(value);
        onOpen();
    };

    const handleDeletePartner = (value) => {
        if (value) {
        if (typeof value === "object") {
            setDeletePartnerData(value);
        } else {
            console.log("Delete Partner", value);
            setDeletePartnerData(null);
        }
        } else {
        setDeletePartnerData(null);
        }
    };

    useEffect(() => {
        if (isOpen) return;

        setEditPartnerData(null);
    }, [isOpen]);

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white uppercase">
          partner list
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
                        <p className="pr-14 text-sm font-bold text-navy-700 dark:text-white">
                            <Image
                                boxSize="4rem"
                                objectFit="cover"
                                src={cell.value}
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
                        <p className="pr-14 text-sm font-semibold text-blue-700 dark:text-white hover:underline">
                            <a href={cell.value}>Link to {cell.row.cells[1].value}</a>
                        </p>
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
                            onClick={() => handleDeletePartner(cell.row.original)}
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
        onSubmit={handleSubmitPartner}
        defaultValue={editPartnerData ? editPartnerData : defaultValue}
      />
      <UserDelete
        data={deletePartnerData}
        onSubmit={handleDeletePartner}
      />
    </Card>
  );
};

export default PartnerTable;
