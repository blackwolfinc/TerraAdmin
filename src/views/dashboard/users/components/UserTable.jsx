import React from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "components/card";
import { Button, Tag, TagLabel, useDisclosure } from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import UserModal from "./UserModal";
import UserDelete from "./UserDelete";
import { useUsersDataQuery } from "services/user/get-all-users";
import { useCreateUserMutation } from "services/user/post-user";
import { useUpdateUserMutation } from "services/user/put-user";
import { toast } from "react-toastify";
import { useDeleteUserMutation } from "services/user/delete-user";

const UserTable = ({ columnsData }) => {
  const { data: fetchAllUsers, refetch: refetchAllUsers } = useUsersDataQuery();
  const { mutate: createUser } = useCreateUserMutation();
  const { mutate: updateUser } = useUpdateUserMutation();
  const { mutate: deleteUser } = useDeleteUserMutation();

  const columns = React.useMemo(() => columnsData, [columnsData]);
  const data = React.useMemo(
    () => fetchAllUsers?.data?.data?.datas || [],
    [fetchAllUsers?.data?.data?.datas]
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
  const [editUserData, setEditUserData] = React.useState(null);
  const [deleteUserData, setDeleteUserData] = React.useState(null);

  React.useEffect(() => {
    if (isOpen) return;

    setEditUserData(null);
  }, [isOpen]);

  const handleSubmitUser = (value) => {
    console.log("Submit User", value);

    if (!value?.id) {
      createUser(value, {
        onSuccess: () => {
          refetchAllUsers();
          toast.success("Create user success!");
        },
        onError: (err) => {
          toast.error("Create user failed!");
        },
      });
    } else {
      const id = value.id;
      delete value.id;
      updateUser(
        {
          id: id,
          body: value,
        },
        {
          onSuccess: () => {
            refetchAllUsers();
            toast.success("Update user success!");
          },
          onError: (err) => {
            toast.error("Update user failed!");
          },
        }
      );
    }
  };

  const handleEditUser = (value) => {
    setEditUserData(value);
    onOpen();
  };

  const handleDeleteUser = (value) => {
    if (value) {
      if (typeof value === "object") {
        setDeleteUserData(value);
      } else {
        deleteUser(value, {
          onSuccess: () => {
            refetchAllUsers();
            toast.success("Delete product success!");
          },
          onError: (err) => {
            toast.error("Delete product failed!");
          },
        });
        setDeleteUserData(null);
      }
    } else {
      setDeleteUserData(null);
    }
  };

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          LIST USERS
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
                      (column.Header === "ROLE" && "w-[200px]") ||
                      (column.Header === "EDIT" && "w-[80px]") ||
                      (column.Header === "DELETE" && "w-[80px]") ||
                      "pr-14"
                    } border-b border-gray-200 pb-[10px] text-start dark:!border-navy-700`}
                  >
                    <div
                      className={`${
                        (column.Header === "EDIT" && "justify-center") ||
                        (column.Header === "DELETE" && "justify-center") ||
                        "justify-between"
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
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "ROLE") {
                      data = (
                        <p className="pr-14 text-sm font-semibold text-navy-700 dark:text-white">
                          <Tag
                            size="sm"
                            borderRadius="full"
                            variant="solid"
                            colorScheme={
                              (cell.value === "SUPER ADMIN" && "blue") ||
                              (cell.value === "ADMIN" && "orange")
                            }
                          >
                            <TagLabel>{cell.value}</TagLabel>
                          </Tag>
                        </p>
                      );
                    } else if (cell.column.Header === "EDIT") {
                      data = (
                        <div className="flex justify-center text-gray-900 dark:text-white">
                          <Button
                            colorScheme="purple"
                            size="sm"
                            onClick={() => handleEditUser(cell.row.original)}
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
                            onClick={() => handleDeleteUser(cell.row.original)}
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
      <UserModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitUser}
        defaultValue={editUserData}
      />
      <UserDelete data={deleteUserData} onSubmit={handleDeleteUser} />
    </Card>
  );
};

export default UserTable;
