import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";

const ModalDelete = ({ isOpen, title, onSubmit, onClose, ...rest }) => {
  return (
    <Modal
      isOpen={isOpen}
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
      size="sm"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="text-center">Konfirmasi Hapus</ModalHeader>
        <hr />
        <ModalBody className="text-center">
          Apakah Anda yakin ingin manghapus produk "{title}"?
        </ModalBody>
        <ModalFooter ml="auto" mr="auto">
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => {
              if (onSubmit) onSubmit();
            }}
          >
            Delete
          </Button>
          <Button
            colorScheme="gray"
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDelete;
