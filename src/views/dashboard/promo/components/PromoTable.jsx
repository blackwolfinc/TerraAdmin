import React, { useMemo } from "react";
import { Button } from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import NoImage from "assets/img/no-image.jpg";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

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

const PromoTable = ({ tableData, onEdit, onDelete }) => {
  const columns = columnsData;
  const data = useMemo(() => tableData, [tableData]);

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
  initialState.pageSize = 11;

  return (
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
                  {...column.getHeaderProps(column.getSortByToggleProps())}
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
                      column.Header === "EDIT" || column.Header === "DELETE"
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
                      <div className="mr-14 flex aspect-video h-20 w-fit items-center justify-center overflow-hidden rounded-lg">
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
                      <p className="pr-14 text-sm font-bold text-navy-700 dark:text-white">
                        {cell.value || "-"}
                      </p>
                    );
                  } else if (cell.column.Header === "EDIT") {
                    data = (
                      <div className="flex justify-center text-gray-900 dark:text-white">
                        <Button
                          colorScheme="purple"
                          size="sm"
                          onClick={() => onEdit(cell.value)}
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
                          onClick={() => onDelete(cell.value)}
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
  );
};

export default PromoTable;
