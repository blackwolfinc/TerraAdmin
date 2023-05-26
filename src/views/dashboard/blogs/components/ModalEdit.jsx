import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import InputField from "components/fields/InputField";
import Quill from "components/quill";

const ModalEdit = ({
  title = "Create New Blog",
  isOpen,
  onClose,
  initialValue = null,
}) => {
  const [value, setValue] = React.useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      title: initialValue?.title || "",
      content: initialValue?.content || "",
    }
  );

  useEffect(() => {
    if (!isOpen) return;
    if (initialValue) {
      setValue({
        title: initialValue?.title || "",
        content: initialValue?.content || "",
      });
    }
  }, [initialValue, isOpen]);

  const clear = () => {
    setValue({ title: "", content: "" });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
      <ModalOverlay />
      <ModalContent>
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
          <Quill
            value={value.content}
            onChange={(e) => setValue({ content: e })}
          />
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end gap-2">
            <button className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              Edit
            </button>
            <button
              className="rounded-xl bg-red-500 px-5 py-3 text-sm font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
              onClick={clear}
            >
              Clear
            </button>
            <button
              className="rounded-xl bg-gray-100 px-5 py-3 text-sm font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
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

export default ModalEdit;
