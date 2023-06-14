import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import moment from "moment";

const ModalPreview = ({ isOpen, onClose, data }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size="full"
      scrollBehavior={"inside"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="text-center">Preview</ModalHeader>
        <ModalCloseButton />
        <hr />
        <ModalBody className="bg-gray-200">
          <div className="flex justify-center">
            <div className="w-3/5 bg-white p-2">
              <div className="mb-8 flex aspect-[3/1] w-full items-center justify-center overflow-hidden">
                <img
                  src={
                    data?.image
                      ? `${process.env.REACT_APP_API_IMAGE}/${data.image}`
                      : ""
                  }
                  alt={`thumbnail`}
                  className="min-h-full min-w-full"
                />
              </div>
              <h1 className="mb-2 text-3xl font-bold">{data?.title}</h1>
              <div className="mb-8 flex items-center gap-4">
                <p>
                  Dibuat oleh{" "}
                  <span className="font-semibold">{data?.createdBy}</span>
                </p>
                <span>{moment(data?.createdAt).format("DD/MM/YYYY")}</span>
              </div>
              <div className="mb-20">
                <div dangerouslySetInnerHTML={{ __html: data?.body }}></div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalPreview;
