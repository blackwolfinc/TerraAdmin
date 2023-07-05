import React from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "components/card";
import { useCustomersDataQuery } from "services/customer/get-all-customers";
import Pagination from "components/pagination";
import { Button } from "@chakra-ui/react";
import { HiTrash } from "react-icons/hi";
import CustomerDelete from "./CustomerDelete";
import { useDeleteCustomersMutation } from "services/customer/delete-customers";
import { toast } from "react-toastify";

const CustomerTable = ({ columnsData }) => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data: fetchAllCustomers, refetch: refetchCustomer } =
    useCustomersDataQuery({
      page: currentPage,
      paginate: pageSize,
    });
  const { mutate: mutateDeleteCustomer } = useDeleteCustomersMutation();
  const [deleteData, setDeleteData] = React.useState(null);

  const columns = React.useMemo(() => columnsData, [columnsData]);
  const data = React.useMemo(
    () => fetchAllCustomers?.data?.data?.datas || [],
    [fetchAllCustomers?.data?.data?.datas]
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

  const handleDeleteCustomer = (id) => {
    mutateDeleteCustomer(id, {
      onSuccess: () => {
        toast.success("Delete customer successfully");
        refetchCustomer();
        setDeleteData(null);
      },
      onError: (error) => {
        toast.error(error?.data?.message);
      },
    });
  };

  return (
    <>
      <CustomerDelete
        data={deleteData}
        onSubmit={handleDeleteCustomer}
        onClosed={() => setDeleteData(null)}
      />
      <div>
        <Card extra="w-full pb-10 p-4 h-full">
          <header className="relative flex items-center justify-between">
            <div className="text-xl font-bold text-navy-700 dark:text-white">
              LIST CUSTOMER
            </div>
          </header>

          <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
            <table {...getTableProps()} className="w-full">
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={index}
                        className={`${
                          (column.Header === "CATEGORY" && "w-[200px]") ||
                          (column.Header === "DETAIL" && "w-[80px]") ||
                          (column.Header === "EDIT" && "w-[80px]") ||
                          (column.Header === "DELETE" && "w-[80px]") ||
                          "pr-14"
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
                        if (cell.column.Header === "FULLNAME") {
                          data = (
                            <p className="pr-14 text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "EMAIL") {
                          data = (
                            <p className="pr-14 text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value || "-"}
                            </p>
                          );
                        } else if (cell.column.Header === "PHONE") {
                          data = (
                            <p className="pr-14 text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "DELETE") {
                          data = (
                            <div className="flex justify-center text-red-500 dark:text-white">
                              <Button
                                colorScheme="red"
                                size="sm"
                                onClick={() => setDeleteData(cell.row.original)}
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
          <div className="mt-8 flex w-full justify-end">
            <Pagination
              totalPage={Math.ceil(
                fetchAllCustomers?.data?.data?.total / pageSize
              )}
              onPageChange={({ selected }) => setCurrentPage(selected + 1)}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default CustomerTable;
