import React, { useMemo } from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";
import { HiTrash, HiEye, HiOutlineExternalLink } from "react-icons/hi";
import NoImage from "assets/img/no-image.jpg";
import Card from "components/card";
import { Spinner } from "@chakra-ui/react";
import ModalInput from "./ModalInput";
import ModalDelete from "./ModalDelete";
import { useBlogDataQuery } from "services/blogs/get-blogs";
import { useCreateBlogMutation } from "services/blogs/post-blogs";
import { toast } from "react-toastify";
import { useUploadImagesBlogMutation } from "services/blogs/post-images-blog";
import { convertToSlug } from "utils/convertToSlug";
import { useEditBlogMutation } from "services/blogs/patch-blogs";
import { useDeleteBlogMutation } from "services/blogs/delete-blogs";
import ModalPreview from "./ModalPreview";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Pagination from "components/pagination";
import { FiSearch } from "react-icons/fi";

const columnsData = [
  {
    Header: "THUMBNAIL",
    accessor: "image",
    disableSortBy: true,
  },
  {
    Header: "TITLE",
    accessor: "title",
  },
  {
    Header: "CREATOR",
    accessor: "createdBy",
  },
  {
    id: "preview",
    Header: "PREVIEW",
    accessor: "id",
    disableSortBy: true,
  },
  {
    Header: "LINK",
    accessor: "slug",
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

const BlogsTable = () => {
  // state
  const [isModalCreateOpen, setIsModalCreateOpen] = React.useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  const [modalEditValue, setModalEditValue] = React.useState(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = React.useState(false);
  const [deletedValue, setDeletedValue] = React.useState(null);
  const [isModalPreviewOpen, setIsModalPreviewOpen] = React.useState(false);
  const [previewValue, setPreviewValue] = React.useState(null);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filter, setFilter] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      search: "",
    }
  );

  // API
  const { mutate: createBlog, isLoading: createBlogIsLoading } =
    useCreateBlogMutation();
  const { mutate: uploadImagesBlog, isLoading: uploadImagesBlogIsLoading } =
    useUploadImagesBlogMutation();
  const { mutate: editBlog, isLoading: editBlogIsLoading } =
    useEditBlogMutation();
  const { mutate: deleteBlog } = useDeleteBlogMutation();
  const {
    data: blogsData,
    isLoading: blogsIsLoading,
    refetch: refetchBlog,
  } = useBlogDataQuery({
    page: currentPage,
    paginate: pageSize,
    ...filter,
  });

  const columns = columnsData;
  const data = useMemo(() => blogsData?.data.datas || [], [blogsData]);

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

  const handleOpenEdit = (id) => {
    const selectedData = data?.find((blog) => blog.id === id);
    setModalEditValue(selectedData);

    setIsModalEditOpen(true);
  };

  const handleOpenDelete = (id) => {
    const selectedData = data?.find((blog) => blog.id === id);
    setDeletedValue(selectedData);

    setIsModalDeleteOpen(true);
  };

  const handlePostBlog = (data) => {
    const postData = {
      title: data.title,
      slug: convertToSlug(data.title),
      description: "Blog Description",
      body: data.body,
    };

    createBlog(postData, {
      onSuccess: (res) => {
        toast.success("Blog berhasil ditambahkan");
        handlePostThumbnail(res.data.data.id, data.image);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Gagal menambahkan blog!"
        );
      },
    });
  };

  const handlePostThumbnail = (id, image) => {
    const formData = new FormData();
    formData.append("image", image);

    uploadImagesBlog(
      {
        id,
        data: formData,
      },
      {
        onSuccess: () => {
          toast.success("Thumbnail berhasil ditambahkan");
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Gagal menambahkan thumbnail!"
          );
        },
        onSettled: () => {
          refetchBlog();
          setIsModalCreateOpen(false);
        },
      }
    );
  };

  const handleEditBlog = (data) => {
    const editData = {
      title: data.title,
      slug: convertToSlug(data.title),
      description: "Blog Description",
      body: data.body,
    };

    editBlog(
      {
        id: modalEditValue.id,
        data: editData,
      },
      {
        onSuccess: () => {
          toast.success("Blog berhasil diubah");

          if (data.image !== modalEditValue.image) {
            handlePostThumbnail(modalEditValue.id, data.image);
          }
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Gagal mengubah blog!");
        },
        onSettled: () => {
          refetchBlog();
          setIsModalEditOpen(false);
        },
      }
    );
  };

  const handleDeleteBlog = (id) => {
    deleteBlog(id, {
      onSuccess: () => {
        toast.success("Blog berhasil dihapus");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Gagal menghapus blog!");
      },
      onSettled: () => {
        refetchBlog();
        setIsModalDeleteOpen(false);
      },
    });
  };

  const handlePreview = (id) => {
    const selectedData = data?.find((blog) => blog.id === id);
    setPreviewValue(selectedData);

    setIsModalPreviewOpen(true);
  };

  return (
    <>
      {/* Create New Modal */}
      <ModalInput
        isOpen={isModalCreateOpen}
        onSubmit={handlePostBlog}
        isLoading={createBlogIsLoading || uploadImagesBlogIsLoading}
        onClose={() => setIsModalCreateOpen(false)}
      />
      {/* Edit Modal */}
      <ModalInput
        title="Edit Blog"
        isOpen={isModalEditOpen}
        isLoading={editBlogIsLoading}
        onClose={() => setIsModalEditOpen(false)}
        onSubmit={handleEditBlog}
        initialValue={modalEditValue}
      />
      {/* Delete Modal */}
      <ModalDelete
        title={`${deletedValue?.title || ""}`}
        isOpen={isModalDeleteOpen}
        onSubmit={() => handleDeleteBlog(deletedValue?.id)}
        onClose={() => setIsModalDeleteOpen(false)}
      />
      {/* Preview Modal */}
      <ModalPreview
        isOpen={isModalPreviewOpen}
        onClose={() => setIsModalPreviewOpen(false)}
        data={previewValue}
      />
      <Card extra={"mt-3 w-full sm:overflow-auto p-4"}>
        <div className="mb-2 flex items-center justify-between pb-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            LIST BLOGS
          </div>
          <button
            className="linear rounded-xl bg-brand-500 px-8 py-2 text-center text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
            onClick={() => setIsModalCreateOpen(true)}
          >
            ADD
          </button>
        </div>
        <div className="mb-4">
          <InputGroup>
            <Input
              type="text"
              placeholder="Search by title"
              onBlur={(e) => setFilter({ search: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setFilter({ search: e.target.value });
                }
              }}
            ></Input>
            <InputRightElement>
              <FiSearch />
            </InputRightElement>
          </InputGroup>
        </div>
        {blogsIsLoading && (
          <div className="my-4 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {!blogsIsLoading && data?.length === 0 && (
          <div className="my-4 flex items-center justify-center">
            <div className="text-lg font-bold text-gray-400">
              Belum ada data blog
            </div>
          </div>
        )}
        {!blogsIsLoading && data?.length > 0 && (
          <>
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
                            column.Header === "PREVIEW" ||
                            column.Header === "LINK" ||
                            column.Header === "EDIT" ||
                            column.Header === "DELETE"
                              ? "w-20 px-6"
                              : ""
                          } ${
                            column.Header === "TITLE" ||
                            column.Header === "CREATOR"
                              ? "min-w-[160px]"
                              : ""
                          } ${column.Header === "THUMBNAIL" ? "w-40" : ""}`}
                        >
                          <div
                            className={`${
                              column.Header === "PREVIEW" ||
                              column.Header === "LINK" ||
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
                          if (cell.column.Header === "THUMBNAIL") {
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
                          } else if (cell.column.Header === "PREVIEW") {
                            data = (
                              <div className="flex justify-center text-gray-700 dark:text-white">
                                <Button
                                  onClick={() => handlePreview(cell.value)}
                                  colorScheme="gray"
                                  size="sm"
                                >
                                  <HiEye />
                                </Button>
                              </div>
                            );
                          } else if (cell.column.Header === "LINK") {
                            data = (
                              <div className="flex justify-center text-gray-700 dark:text-white">
                                <Button
                                  onClick={() =>
                                    window.open(
                                      `/blogs/${cell.value}`,
                                      "_blank"
                                    )
                                  }
                                  colorScheme="gray"
                                  size="sm"
                                  disabled={!cell.value}
                                >
                                  <HiOutlineExternalLink />
                                </Button>
                              </div>
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
            <div className="mt-8 flex w-full justify-end">
              <Pagination
                totalPage={Math.ceil(blogsData?.data?.total / pageSize)}
                onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              />
            </div>
          </>
        )}
      </Card>
    </>
  );
};

export default BlogsTable;
