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

const ProductModal = (props) => {
  const { isOpen, onClose, onSubmit, defaultValue } = props;

  const dataValue = {
    title: "",
    description: "",
    category: "",
    specification: [""],
    detailProduct: "",
    productImageSlides: [],
    image_denah_path: "",
  };

  const [isError, setIsError] = React.useState(false);
  const [value, setValue] = React.useState(dataValue);

  React.useEffect(() => {
    if (!defaultValue) return;
    setValue(defaultValue);
  }, [defaultValue]);

  React.useEffect(() => {
    setIsError(false);
  }, [value]);

  const handleCancel = () => {
    setValue(dataValue);
    setIsError(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError(false);

    const newSpecification =
      value.specification.filter((item) => item !== "") || null;

    // Regex for empty string or null or undefined
    const nonEmptyRegex = /^(?!(^$|null|undefined))/;

    // Check required
    if (
      !nonEmptyRegex.test(value.title) ||
      !nonEmptyRegex.test(value.description) ||
      !nonEmptyRegex.test(value.category) ||
      !nonEmptyRegex.test(newSpecification) ||
      !nonEmptyRegex.test(value.detailProduct) ||
      !nonEmptyRegex.test(value.productImageSlides) ||
      !nonEmptyRegex.test(value.image_denah_path)
    ) {
      setIsError(true);
      return;
    }

    onSubmit({
      id: value.id || null,
      title: value.title,
      description: value.description,
      category: value.category,
      specification: newSpecification,
      detailProduct: value.detailProduct,
      productImageSlides:
        value?.productImageSlides?.filter((item) => item instanceof File) ||
        null,
      image_denah_path:
        value?.image_denah_path instanceof File ? value.image_denah_path : null,
      deleteImages:
        value?.deleteImages
          ?.filter((item) => item.id !== undefined)
          .map((item) => item.id)
          .join(",") || null,
    });

    handleCancel();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
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
              name="title"
              value={value.title || ""}
              onChange={handleChange}
            />
            {isError && <FormErrorMessage>Title is required.</FormErrorMessage>}
          </FormControl>
          <FormControl isRequired mt={4} isInvalid={isError}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description"
              name="description"
              value={value.description || ""}
              onChange={handleChange}
            />
            {isError && (
              <FormErrorMessage>Description is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired mt={4} isInvalid={isError}>
            <FormLabel>Specification</FormLabel>
            {value?.specification?.map((textInput, index) => (
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
                {index === value?.specification?.length - 1 ? (
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
              name="category"
              value={value.category || ""}
              onChange={handleChange}
            >
              <option value="BIG_SALE">Big Sale</option>
              <option value="SUPER_DEAL">Super Deal</option>
              <option value="STANDARD">Standard</option>
            </Select>
            {isError && (
              <FormErrorMessage>Category is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired mt={4} isInvalid={isError}>
            <FormLabel>Detail Product</FormLabel>
            <Box borderWidth={isError ? "2px" : "0px"} borderColor="red">
              <Quill
                value={value.detailProduct || ""}
                onChange={(e) => setValue({ ...value, detailProduct: e })}
              />
            </Box>
            {isError && (
              <FormErrorMessage>Detail Product is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired mt={4} isInvalid={isError}>
            <FormLabel>Images</FormLabel>
            <Box
              className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6"
              borderWidth={isError ? "2px" : "0px"}
              borderColor="red"
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
                  PNG, JPG and JPEG files are allowed (Max 2MB)
                </Text>
                <input
                  id="multiple-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setValue({
                      ...value,
                      productImageSlides: [
                        ...value.productImageSlides,
                        ...Array.from(e.target.files),
                      ],
                    })
                  }
                  multiple
                  className="hidden"
                />
              </label>
              <Stack mt={4} spacing={2}>
                {value?.productImageSlides?.map((file, index) => (
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
                      // onClick={() =>
                      //   setValue({
                      //     ...value,
                      //     productImageSlides: value.productImageSlides.filter(
                      //       (selectedFile) => selectedFile !== file
                      //     ),
                      //   })
                      // }
                      onClick={() =>
                        setValue((prevValue) => ({
                          ...prevValue,
                          productImageSlides:
                            prevValue.productImageSlides.filter(
                              (selectedFile) => selectedFile !== file
                            ),
                          deleteImages: prevValue.deleteImages
                            ? [...prevValue.deleteImages, file]
                            : [file],
                        }))
                      }
                      ml="auto"
                    >
                      <MdDelete />
                    </Button>
                  </Box>
                ))}
              </Stack>
            </Box>
            {isError && (
              <FormErrorMessage>Product Images is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired mt={4} isInvalid={isError}>
            <FormLabel>Sketch</FormLabel>
            <Box
              className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6"
              borderWidth={isError ? "2px" : "0px"}
              borderColor="red"
              p={4}
            >
              {!value.image_denah_path ? (
                <label
                  htmlFor="single-upload"
                  className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0"
                >
                  <MdFileUpload className="text-[80px] text-brand-300 dark:text-white" />
                  <Text className="text-xl font-bold text-brand-300 dark:text-white">
                    Upload File
                  </Text>
                  <Text className="mt-2 text-sm font-medium text-gray-600">
                    PNG, JPG and JPEG files are allowed (Max 2MB)
                  </Text>
                  <input
                    id="single-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setValue({
                        ...value,
                        image_denah_path: e.target.files[0],
                      })
                    }
                    className="hidden"
                  />
                </label>
              ) : (
                <Box>
                  <Box mb={2} textAlign="center">
                    <Image
                      src={
                        value.image_denah_path instanceof File
                          ? URL.createObjectURL(value.image_denah_path)
                          : `${process.env.REACT_APP_API_IMAGE}/${value.image_denah_path}`
                      }
                      alt="Preview"
                      maxH="200px"
                      maxW="200px"
                      mx="auto"
                    />
                  </Box>
                  <Text textAlign="center" fontSize="sm" color="gray.600">
                    {value.image_denah_path.name
                      ? value.image_denah_path.name
                      : value.image_denah_path}
                  </Text>
                  <Button
                    size="sm"
                    colorScheme="red"
                    leftIcon={<MdDelete />}
                    onClick={() =>
                      setValue({ ...value, image_denah_path: null })
                    }
                    mb={2}
                  >
                    Remove
                  </Button>
                </Box>
              )}
            </Box>
            {isError && (
              <FormErrorMessage>Product Images is required.</FormErrorMessage>
            )}
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
