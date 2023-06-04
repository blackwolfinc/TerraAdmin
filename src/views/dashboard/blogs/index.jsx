import React from "react";
import Card from "components/card";
import ModalInput from "./components/ModalInput";
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";

// dummy data
import { DummyBlog } from "./variables/dummyBlog";
import BlogsTable from "./components/BlogsTable";

const Blogs = () => {
  const [isModalCreateOpen, setIsModalCreateOpen] = React.useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  const [modalEditValue, setModalEditValue] = React.useState(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = React.useState(false);
  const [deletedTitle, setDeletedTitle] = React.useState("");

  const handleOpenEdit = (id) => {
    const data = DummyBlog.find((blog) => blog.id === id);
    setModalEditValue(data);

    setIsModalEditOpen(true);
  };

  const handleCloseEdit = () => {
    setModalEditValue(null);
    setIsModalEditOpen(false);
  };

  const handleOpenDelete = (id) => {
    const data = DummyBlog.find((blog) => blog.id === id);
    setDeletedTitle(
      <p className="font-normal">
        Are you sure you want to delete{" "}
        <span className="font-bold">{data.title} ?</span>
      </p>
    );

    setIsModalDeleteOpen(true);
  };

  return (
    <>
      {/* Create New Modal */}
      <ModalInput
        isOpen={isModalCreateOpen}
        onClose={() => setIsModalCreateOpen(false)}
      />
      {/* Edit Modal */}
      <ModalEdit
        title="Edit Blog"
        isOpen={isModalEditOpen}
        onClose={handleCloseEdit}
        initialValue={modalEditValue}
      />
      {/* Delete Modal */}
      <ModalDelete
        title={deletedTitle}
        isOpen={isModalDeleteOpen}
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
          tableData={DummyBlog}
          onDetail={(id) => console.log(`Lihat detail product ${id}`)}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      </Card>
    </>
  );
};

export default Blogs;
