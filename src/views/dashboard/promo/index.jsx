import React from "react";
import Card from "components/card";
import { Spinner } from "@chakra-ui/react";
import PromoTable from "./components/PromoTable";
import ModalInputPromo from "./components/ModalInputPromo";
import ModalDeletePromo from "./components/ModalDeletePromo";
import { usePromoDataQuery } from "services/promo/get-promo";
import { useCreatePromoMutation } from "services/promo/post-promo";
import { useEditPromoMutation } from "services/promo/patch-promo";
import { useDeletePromoMutation } from "services/promo/delete-promo";
import { useUploadImagesPromoMutation } from "services/promo/post-promo-image";
import { toast } from "react-toastify";

const Promo = () => {
  // state
  const [isModalCreateOpen, setIsModalCreateOpen] = React.useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  const [modalEditValue, setModalEditValue] = React.useState(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = React.useState(false);
  const [deletedValue, setDeletedValue] = React.useState(null);

  // api data
  const { mutate: createPromo, isLoading: createPromoIsLoading } =
    useCreatePromoMutation();
  const { mutate: uploadPromoImage, isLoading: uploadPromoImageIsLoading } =
    useUploadImagesPromoMutation();
  const { mutate: editPromo, isLoading: editPromoIsLoading } =
    useEditPromoMutation();
  const { mutate: deletePromo } = useDeletePromoMutation();
  const {
    data: promoData,
    isLoading: promoIsLoading,
    refetch: refetchPromo,
  } = usePromoDataQuery();
  const promoDataRows = promoData?.data.datas || [];

  const handleOpenEdit = (id) => {
    const data = promoDataRows.find((item) => item.id === id);
    setModalEditValue(data);
    setIsModalEditOpen(true);
  };

  const handleOpenDelete = (id) => {
    const data = promoDataRows.find((item) => item.id === id);
    setDeletedValue(data);
    setIsModalDeleteOpen(true);
  };

  const handlePostPromo = (data) => {
    const postData = {
      title: data?.title,
      description: data?.description,
      category: data?.category,
    };

    createPromo(postData, {
      onSuccess: (res) => {
        toast.success("Berhasil menambahkan promo.");
        refetchPromo();

        const { id } = res.data.data;
        if (data?.image) {
          handleUploadPromoImage(id, data?.image);
          return;
        }

        setIsModalCreateOpen(false);
      },
      onError: () => {
        toast.error("Gagal menambahkan promo.");
      },
    });
  };

  const handleUploadPromoImage = (id, image) => {
    const formData = new FormData();
    formData.append("image", image);

    uploadPromoImage(
      { id: id, data: formData },
      {
        onSuccess: () => {
          toast.success("Berhasil menambahkan gambar promo.");
          refetchPromo();
        },
        onError: () => {
          toast.error("Gagal menambahkan gambar promo.");
        },
        onSettled: () => {
          setIsModalCreateOpen(false);
        },
      }
    );
  };

  const handleEditPromo = (data) => {
    const editData = {
      title: data?.title,
      description: data?.description,
      category: data?.category,
    };

    editPromo(
      { id: modalEditValue?.id, data: editData },
      {
        onSuccess: () => {
          toast.success("Berhasil mengubah promo.");
          refetchPromo();

          if (data.image !== modalEditValue?.image) {
            handleUploadPromoImage(modalEditValue?.id, data?.image);
            return;
          }

          setIsModalEditOpen(false);
        },
        onError: () => {
          toast.error("Gagal mengubah promo.");
        },
      }
    );
  };

  const handleDeletePromo = (id) => {
    deletePromo(id, {
      onSuccess: () => {
        toast.success("Berhasil menghapus promo.");
        refetchPromo();
      },
      onError: () => {
        toast.error("Gagal menghapus promo.");
      },
      onSettled: () => {
        setIsModalDeleteOpen(false);
      },
    });
  };

  return (
    <>
      {/* Create New Modal */}
      <ModalInputPromo
        isOpen={isModalCreateOpen}
        onSubmit={handlePostPromo}
        isLoading={createPromoIsLoading || uploadPromoImageIsLoading}
        onClose={() => setIsModalCreateOpen(false)}
      />
      {/* Edit Modal */}
      <ModalInputPromo
        title="Edit Promo"
        isOpen={isModalEditOpen}
        isLoading={editPromoIsLoading}
        onClose={() => setIsModalEditOpen(false)}
        onSubmit={handleEditPromo}
        initialValue={modalEditValue}
      />
      {/* Delete Modal */}
      <ModalDeletePromo
        title={`${deletedValue?.title || ""}`}
        isOpen={isModalDeleteOpen}
        onSubmit={() => handleDeletePromo(deletedValue?.id)}
        onClose={() => setIsModalDeleteOpen(false)}
      />
      <Card extra={"mt-3 w-full sm:overflow-auto p-4"}>
        <div className="mb-4 flex items-center justify-between pb-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            LIST PROMO
          </div>
          <button
            className="linear rounded-xl bg-brand-500 px-8 py-2 text-center text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
            onClick={() => setIsModalCreateOpen(true)}
          >
            ADD
          </button>
        </div>
        {promoIsLoading && (
          <div className="my-4 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {!promoIsLoading && promoDataRows?.length === 0 && (
          <div className="my-4 flex items-center justify-center">
            <div className="text-lg font-bold text-gray-400">
              Belum ada data promo
            </div>
          </div>
        )}
        {!promoIsLoading && promoDataRows?.length > 0 && (
          <PromoTable
            tableData={promoDataRows || []}
            onDetail={(id) => console.log(`Lihat detail product ${id}`)}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        )}
      </Card>
    </>
  );
};

export default Promo;
