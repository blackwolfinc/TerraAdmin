import React from "react";
import { MdModeEditOutline, MdDelete, MdRemoveRedEye } from "react-icons/md";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Card from "components/card";
import ModalInput from "./components/ModalInput";
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";

// dummy data
import { DummyBlog } from "./variables/dummyBlog";

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
        <div className="mx-5 flex items-center justify-between pb-4">
          {/* <div className="text-xl font-bold text-navy-700 dark:text-white">
            Data Blogs
          </div> */}
          <button
            className="ml-auto rounded-xl bg-brand-500 px-5 py-3 text-sm font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            onClick={() => setIsModalCreateOpen(true)}
          >
            ADD
          </button>
        </div>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th className="w-full">Title</Th>
              <Th>Lihat</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {DummyBlog.map((blog) => (
              <Tr key={blog.id}>
                <Td>{blog.title}</Td>
                <Td>
                  <div className="flex items-center justify-center">
                    <button>
                      <MdRemoveRedEye className="opacity-50 transition-all hover:opacity-100" />
                    </button>
                  </div>
                </Td>
                <Td>
                  <div className="flex items-center justify-center">
                    <button onClick={() => handleOpenEdit(blog.id)}>
                      <MdModeEditOutline className="opacity-50 transition-all hover:opacity-100" />
                    </button>
                  </div>
                </Td>
                <Td>
                  <div className="flex items-center justify-center">
                    <button onClick={() => handleOpenDelete(blog.id)}>
                      <MdDelete className="text-red-500 opacity-50 transition-all hover:opacity-100" />
                    </button>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
    </>
  );
};

export default Blogs;
