import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

const ModalDelete = (props) => {
  const { title = "", isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="text-center">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>
        <div className="flex justify-center gap-2 pb-4">
          <button className="rounded-xl bg-red-500 px-5 py-3 text-sm font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200">
            Delete
          </button>
          <button
            className="rounded-xl bg-gray-100 px-5 py-3 text-sm font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ModalDelete;
