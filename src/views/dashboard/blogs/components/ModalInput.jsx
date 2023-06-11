import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@chakra-ui/react";
import { MdFileUpload } from "react-icons/md";
import InputField from "components/fields/InputField";
import Quill from "components/quill";

const ModalInput = ({
  title = "Create New Blog",
  isOpen,
  onSubmit,
  onClose,
  initialValue = null,
  isLoading = false,
}) => {
  const [value, setValue] = React.useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      title: initialValue?.title || "",
      image: initialValue?.image || "",
      body: initialValue?.body || "",
    }
  );

  useEffect(() => {
    clear();
    if (!isOpen) return;
    if (initialValue) {
      setValue({
        title: initialValue?.title || "",
        image: initialValue?.image || "",
        body: initialValue?.body || "",
      });
    }
  }, [initialValue, isOpen]);

  const clear = () => {
    setValue({
      title: "",
      image: "",
      body: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"full"}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent>
        {isLoading && (
          <div className="absolute z-10 h-full w-full bg-[#000]/20">
            <div className="flex h-full w-full items-center justify-center">
              <Spinner />
            </div>
          </div>
        )}
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Title"
            placeholder="Insert a title blog"
            id="title"
            type="text"
            required
            value={value.title}
            onChange={(e) => setValue({ title: e.target.value })}
          />
          <label className="group mb-4 flex aspect-video h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 dark:!border-navy-700 lg:pb-0">
            <div className="relative h-full w-full">
              {value.image && (
                <div className="absolute h-full w-full p-2">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
                    <img
                      src={
                        value.image instanceof File
                          ? URL.createObjectURL(value.image)
                          : `${process.env.REACT_APP_API_IMAGE}/${value.image}`
                      }
                      alt={"Thumbnail"}
                      className="min-h-full min-w-full"
                    />
                  </div>
                </div>
              )}
              <div
                className={`absolute flex h-full w-full flex-col items-center justify-center rounded-lg bg-white/50 ${
                  value.image ? "hidden group-hover:flex" : ""
                }`}
              >
                <MdFileUpload className="text-[40px] text-brand-500 dark:text-white" />
                <h4 className="text-md font-bold text-brand-500 dark:text-white">
                  Upload Thumbnail
                </h4>
                <p className="mt-2 text-sm font-medium text-gray-600">
                  PNG, and JPG files allowed
                </p>
                <input
                  id="thumbnail"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => {
                    setValue({ image: e.target.files[0] });
                  }}
                  className="hidden"
                />
              </div>
            </div>
          </label>
          <Quill value={value.body} onChange={(e) => setValue({ body: e })} />
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                if (onSubmit) onSubmit(value);
              }}
              disabled={
                isLoading || !value.title || !value.image || !value.body
              }
              className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              Save
            </button>
            <button
              disabled={isLoading}
              className="rounded-xl bg-red-500 px-5 py-3 text-sm font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
              onClick={clear}
            >
              Clear
            </button>
            <button
              disabled={isLoading}
              className="rounded-xl bg-gray-100 px-5 py-3 text-sm font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalInput;
