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

const CustomerDelete = (props) => {
  const { data, onSubmit, onClosed } = props;

  return (
    <Modal
      isOpen={data}
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
      size="sm"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="text-center">Konfirmasi Hapus</ModalHeader>
        <ModalBody className="text-center">
          Apakah Anda yakin ingin manghapus data customer tersebut?
        </ModalBody>
        <ModalFooter ml="auto" mr="auto">
          <Button colorScheme="red" mr={3} onClick={() => onSubmit(data.id)}>
            Delete
          </Button>
          <Button colorScheme="gray" onClick={onClosed}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomerDelete;
