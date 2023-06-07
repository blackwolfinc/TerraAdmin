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
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { MdFileUpload, MdDelete } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import Quill from "components/quill";

const ProductModal = ({ isOpen, onClose, onSubmit, defaultValue }) => {
  const [isError, setIsError] = React.useState(false);
  const [value, setValue] = React.useState({
    title: "",
    description: "",
    specification: [""],
    sketch: null,
    images: [],
    category: "",
    detailProduct: "<p></p>",
    ...defaultValue,
  });

  React.useEffect(() => {
    if (!defaultValue) return;
    setValue(defaultValue);
  }, [defaultValue]);

  React.useEffect(() => {
    setIsError(false);
  }, [value]);

  const handleCancel = () => {
    setIsError(false);
    setValue({
      title: "",
      description: "",
      specification: [""],
      sketch: null,
      images: [],
      category: "",
      detailProduct: "<p></p>",
    });
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError(false);

    const newSpecification = value.specification.filter((item) => item !== "");
    const newSketch = value.sketch instanceof File ? value.sketch : null;
    const newImages = value.images.filter((item) =>
      item instanceof File ? item : null
    );

    // Check Required
    if (
      value.title.length > 0 &&
      value.description.length > 0 &&
      newSpecification.length > 0 &&
      value.category.length > 0
    ) {
      onSubmit({
        id: value.id || null,
        title: value.title,
        description: value.description,
        specification: newSpecification,
        sketch: newSketch,
        images: newImages,
        category: value.category,
        detailProduct: value.detailProduct,
      });
      setValue({
        title: "",
        description: "",
        specification: [""],
        sketch: null,
        images: [],
        category: "",
        detailProduct: "<p></p>",
      });
      onClose();
    } else {
      setIsError(true);
    }
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
        <ModalHeader>{value.id ? "EDIT" : "ADD"} PRODUCT</ModalHeader>
        <ModalCloseButton onClick={handleCancel} />
        <hr />
        <ModalBody>
          <FormControl isRequired mt={4} isInvalid={isError}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Title"
              value={value.title}
              onChange={(e) => setValue({ ...value, title: e.target.value })}
            />
            {isError && <FormErrorMessage>Title is required.</FormErrorMessage>}
          </FormControl>
          <FormControl isRequired mt={4} isInvalid={isError}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description"
              value={value.description}
              onChange={(e) =>
                setValue({ ...value, description: e.target.value })
              }
            />
            {isError && (
              <FormErrorMessage>Description is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired mt={4} isInvalid={isError}>
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
            {isError && (
              <FormErrorMessage>Specification is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired mt={4} isInvalid={isError}>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select Category"
              name="role"
              value={value.category}
              onChange={(e) => setValue({ ...value, category: e.target.value })}
            >
              <option value="BIG_SALE">Big Sale</option>
              <option value="SUPER_DEAL">Super Deal</option>
              <option value="STANDARD">Standard</option>
            </Select>
            {isError && (
              <FormErrorMessage>Category is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Detail Product</FormLabel>
            <Box className={isError ? "border-2 border-red-500" : ""}>
              <Quill
                value={value.detailProduct}
                onChange={(e) => setValue({ ...value, detailProduct: e })}
              />
            </Box>
          </FormControl>
          <FormControl mt={4}>
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
                  accept="image/*"
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
                        file instanceof File
                          ? URL.createObjectURL(file)
                          : `${process.env.REACT_APP_API_IMAGE}/${file.image_path}`
                      }
                      alt="Preview"
                      maxH="80px"
                      maxW="80px"
                      mr={2}
                    />
                    <Text fontSize="sm">
                      {file.image_path ? file.image_path : file.name}
                    </Text>
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
          <FormControl mt={4}>
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
                    accept="image/*"
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
                        value.sketch instanceof File
                          ? URL.createObjectURL(value.sketch)
                          : `${process.env.REACT_APP_API_IMAGE}/${value.sketch}`
                      }
                      alt="Preview"
                      maxH="200px"
                      maxW="200px"
                      mx="auto"
                    />
                  </Box>
                  <Text textAlign="center" fontSize="sm" color="gray.600">
                    {value.sketch.name ? value.sketch.name : value.sketch}
                  </Text>
                  <Button
                    size="sm"
                    colorScheme="red"
                    leftIcon={<MdDelete />}
                    onClick={() => setValue({ ...value, sketch: null })}
                    mb={2}
                  >
                    Remove
                  </Button>
                </Box>
              )}
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <button
            type="submit"
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
