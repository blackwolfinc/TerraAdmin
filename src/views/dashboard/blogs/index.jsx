import React from "react";
import Card from "components/card";
import ModalInput from "./components/ModalInput";
import ModalDelete from "./components/ModalDelete";

// dummy data
import BlogsTable from "./components/BlogsTable";
import { useBlogDataQuery } from "services/blogs/get-blogs";
import { useCreateBlogMutation } from "services/blogs/post-blogs";
import { toast } from "react-toastify";
import { useUploadImagesBlogMutation } from "services/blogs/post-images-blog";
import { convertToSlug } from "utils/convertToSlug";
import { useEditBlogMutation } from "services/blogs/patch-blogs";
import { useDeleteBlogMutation } from "services/blogs/delete-blogs";

const Blogs = () => {
  // state
  const [isModalCreateOpen, setIsModalCreateOpen] = React.useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  const [modalEditValue, setModalEditValue] = React.useState(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = React.useState(false);
  const [deletedValue, setDeletedValue] = React.useState(null);

  // API
  const { mutate: createBlog, isLoading: createBlogIsLoading } =
    useCreateBlogMutation();
  const { mutate: uploadImagesBlog, isLoading: uploadImagesBlogIsLoading } =
    useUploadImagesBlogMutation();
  const { mutate: editBlog, isLoading: editBlogIsLoading } =
    useEditBlogMutation();
  const { mutate: deleteBlog, isLoading: deleteBlogIsLoading } =
    useDeleteBlogMutation();
  const {
    data: blogsData,
    isLoading: blogsIsLoading,
    refetch: refetchBlog,
  } = useBlogDataQuery();
  const blogDataRow = blogsData?.data.datas || [];

  const handleOpenEdit = (id) => {
    const data = blogDataRow?.find((blog) => blog.id === id);
    setModalEditValue(data);

    setIsModalEditOpen(true);
  };

  const handleOpenDelete = (id) => {
    const data = blogDataRow?.find((blog) => blog.id === id);
    setDeletedValue(data);

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
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Gagal mengubah blog!");
        },
        onSettled: () => {
          setIsModalEditOpen(false);
          refetchBlog();
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
      {/* Main */}
      <Card extra={"mt-3 w-full sm:overflow-auto p-4"}>
        <div className="mb-4 flex items-center justify-between pb-4">
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
        <BlogsTable
          tableData={blogDataRow || []}
          onDetail={(id) => console.log(`Lihat detail product ${id}`)}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      </Card>
    </>
  );
};

export default Blogs;
