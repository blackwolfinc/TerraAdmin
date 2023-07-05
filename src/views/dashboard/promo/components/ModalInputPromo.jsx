import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Spinner,
  FormHelperText,
} from "@chakra-ui/react";
import { MdFileUpload } from "react-icons/md";

const PromoCategory = [
  {
    value: "SPECIAL",
    label: "SPECIAL",
  },
  {
    value: "STANDARD",
    label: "STANDARD",
  },
];

const ModalInputPromo = ({
  title = "Create New Promo",
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
      image: initialValue?.image || "",
      title: initialValue?.title || "",
      description: initialValue?.description || "",
      category: initialValue?.category || "",
    }
  );

  useEffect(() => {
    clear();
    if (!isOpen) return;
    if (initialValue) {
      setValue({
        image: initialValue?.image || "",
        title: initialValue?.title || "",
        description: initialValue?.description || "",
        category: initialValue?.category || "",
      });
    }
  }, [initialValue, isOpen]);

  const clear = () => {
    setValue({
      image: "",
      title: "",
      description: "",
      category: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"xl"}
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
          <FormControl isRequired mt={4}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Title"
              name="title"
              value={value.title || ""}
              onChange={(e) => setValue({ title: e.target.value })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Image</FormLabel>
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
                    Upload Image
                  </h4>
                  <p className="mt-2 text-sm font-medium text-brand-300">
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
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={value.description || ""}
              onChange={(e) => setValue({ description: e.target.value })}
              placeholder="Description"
              name="description"
              size="sm"
              rows={"10"}
              resize={"none"}
              maxLength={1000}
            />
            <FormHelperText>
              {value.description?.length} / 1000 Characters
            </FormHelperText>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select Category"
              name="category"
              value={value.category || ""}
              onChange={(e) => setValue({ category: e.target.value })}
            >
              {PromoCategory.map((item, index) => (
                <option key={`category-${index}`} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                if (onSubmit) onSubmit(value);
              }}
              disabled={
                isLoading ||
                !value.title ||
                !value.description ||
                !value.category ||
                !value.image
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

export default ModalInputPromo;
