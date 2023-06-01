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

const GalleryDelete = (props) => {
  const { data, onSubmit } = props;

  return (
    <Modal
      isOpen={data && typeof data === "object"}
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
      size="sm"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="text-center">Konfirmasi Hapus</ModalHeader>
        <ModalBody className="text-center">
          Apakah Anda yakin ingin manghapus Gallery "{data?.title}"?
        </ModalBody>
        <ModalFooter ml="auto" mr="auto">
          <Button colorScheme="red" mr={3} onClick={() => onSubmit(data.id)}>
            Delete
          </Button>
          <Button colorScheme="gray" onClick={() => onSubmit(null)}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GalleryDelete;
