import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Text,
  Box,
  Image,
  Stack,
  Flex,
  ModalCloseButton,
} from "@chakra-ui/react";
import { MdFileUpload, MdDelete } from "react-icons/md";
import { GoPlus } from "react-icons/go";

const ProductModal = (props) => {
  const { isOpen, onClose, onSubmit, defaultValue } = props;

  const [value, setValue] = React.useState(
    defaultValue || {
      title: "",
      description: "",
      specification: [""],
      sketch: null,
      images: [],
    }
  );

  React.useEffect(() => {
    if (!defaultValue) return;

    setValue(defaultValue);
  }, [defaultValue]);

  const handleCancel = () => {
    setValue({
      title: "",
      description: "",
      specification: [""],
      sketch: null,
      images: [],
    });
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
    setValue({
      title: "",
      description: "",
      specification: [""],
      sketch: null,
      images: [],
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{defaultValue?.id ? "EDIT" : "ADD"} PRODUCT</ModalHeader>
        <ModalCloseButton onClick={handleCancel} />
        <hr />
        <ModalBody>
          <FormControl isRequired mt={4}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Title"
              value={value.title || ""}
              onChange={(e) => setValue({ ...value, title: e.target.value })}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description"
              value={value.description || ""}
              onChange={(e) =>
                setValue({ ...value, description: e.target.value })
              }
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Specification</FormLabel>
            {value.specification.map((textInput, index) => (
              <Flex key={index} mt={2}>
                <Input
                  type="text"
                  placeholder="Specification"
                  value={textInput}
                  onChange={(e) =>
                    setValue({
                      ...value,
                      specification: [
                        ...value.specification.slice(0, index),
                        e.target.value,
                        ...value.specification.slice(index + 1),
                      ],
                    })
                  }
                />
                {index === value.specification.length - 1 ? (
                  <Button
                    color="black"
                    ml="2"
                    onClick={() =>
                      setValue({
                        ...value,
                        specification: [...value.specification, ""],
                      })
                    }
                  >
                    <GoPlus />
                  </Button>
                ) : (
                  <Button
                    color="red"
                    ml="2"
                    onClick={() =>
                      setValue({
                        ...value,
                        specification: [
                          ...value.specification.slice(0, index),
                          ...value.specification.slice(index + 1),
                        ],
                      })
                    }
                  >
                    <MdDelete />
                  </Button>
                )}
              </Flex>
            ))}
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Sketch</FormLabel>
            <Box
              className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6"
              p={4}
            >
              {!value.sketch ? (
                <label
                  htmlFor="single-upload"
                  className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0"
                >
                  <MdFileUpload className="text-[80px] text-brand-300 dark:text-white" />
                  <Text className="text-xl font-bold text-brand-300 dark:text-white">
                    Upload File
                  </Text>
                  <Text className="mt-2 text-sm font-medium text-gray-600">
                    PNG and JPG files are allowed
                  </Text>
                  <input
                    id="single-upload"
                    type="file"
                    accept=".png, .jpg"
                    onChange={(e) =>
                      setValue({ ...value, sketch: e.target.files[0] })
                    }
                    className="hidden"
                  />
                </label>
              ) : (
                <Box>
                  <Box mb={2} textAlign="center">
                    <Image
                      src={
                        typeof value.sketch === "string"
                          ? value.sketch
                          : URL.createObjectURL(value.sketch)
                      }
                      alt="Preview"
                      maxH="200px"
                      maxW="200px"
                      mx="auto"
                    />
                  </Box>
                  <Button
                    colorScheme="red"
                    leftIcon={<MdDelete />}
                    onClick={() => setValue({ ...value, sketch: null })}
                    mb={2}
                  >
                    Remove
                  </Button>
                  <Text textAlign="center" fontSize="sm" color="gray.600">
                    {value.sketch.name}
                  </Text>
                </Box>
              )}
            </Box>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Images</FormLabel>
            <Box
              className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6"
              p={4}
            >
              <label
                htmlFor="multiple-upload"
                className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0"
              >
                <MdFileUpload className="text-[80px] text-brand-300 dark:text-white" />
                <Text className="text-xl font-bold text-brand-300 dark:text-white">
                  Upload Files
                </Text>
                <Text className="mt-2 text-sm font-medium text-gray-600">
                  PNG and JPG files are allowed
                </Text>
                <input
                  id="multiple-upload"
                  type="file"
                  accept=".png, .jpg"
                  onChange={(e) =>
                    setValue({
                      ...value,
                      images: [...value.images, ...Array.from(e.target.files)],
                    })
                  }
                  multiple
                  className="hidden"
                />
              </label>
              <Stack mt={4} spacing={2}>
                {value.images.map((file, index) => (
                  <Box
                    key={file.name || index}
                    borderWidth="2px"
                    borderRadius="xl"
                    p={2}
                    display="flex"
                    alignItems="center"
                  >
                    <Image
                      src={
                        typeof file === "string"
                          ? file
                          : URL.createObjectURL(file)
                      }
                      alt="Preview"
                      maxH="80px"
                      maxW="80px"
                      mr={2}
                    />
                    <Text fontSize="sm">{file.name}</Text>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() =>
                        setValue({
                          ...value,
                          images: value.images.filter(
                            (selectedFile) => selectedFile !== file
                          ),
                        })
                      }
                      ml="auto"
                    >
                      <MdDelete />
                    </Button>
                  </Box>
                ))}
              </Stack>
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={handleSubmit}
            className="linear mr-3 rounded-xl bg-brand-500 px-8 py-2 text-center text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
          >
            SAVE
          </button>
          <button
            onClick={handleCancel}
            className="linear rounded-xl bg-gray-100 px-6 py-2 text-center text-base font-medium text-gray-800 transition duration-200 hover:bg-gray-300 active:bg-gray-400"
          >
            CANCEL
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
