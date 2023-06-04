import React, { useMemo } from "react";
import { Button } from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";
import { HiTrash, HiEye } from "react-icons/hi";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const columnsData = [
  {
    Header: "TITLE",
    accessor: "title",
  },
  {
    Header: "LIHAT",
    accessor: "progress",
    disableSortBy: true,
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

const BlogsTable = ({ tableData, onEdit, onDelete }) => {
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
    <table
      {...getTableProps()}
      className="w-full"
      variant="simple"
      color="gray-500"
      mb="24px"
    >
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, index) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={index}
                className={`${
                  column.Header === "LIHAT" ||
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
                    column.Header === "LIHAT" ||
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
                let data = "";
                if (cell.column.Header === "TITLE") {
                  data = (
                    <p className="pr-14 text-sm font-bold text-navy-700 dark:text-white">
                      {cell.value}
                    </p>
                  );
                } else if (cell.column.Header === "LIHAT") {
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
  );
};

export default BlogsTable;
