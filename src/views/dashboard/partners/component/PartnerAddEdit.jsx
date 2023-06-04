import { useEffect, useState } from "react";
import { 
  Box,
  Button, FormControl, FormLabel, Image, Input, InputGroup,
  Modal, ModalBody, ModalCloseButton, 
  ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text 
} from "@chakra-ui/react";
import { MdDelete, MdFileUpload } from "react-icons/md";

const PartnerAddEdit = ({ 
  isOpen, onClose, defaultValue,
  addSubmit, editSubmit
}) => {
  const [value, setValue] = useState({});

  const handleChange = (key, data) => {
    setValue({ ...value, [key]: data });
  };

  const handleClose = () => {
    setValue({
      title: '',
      link: '',
      image:[]
    })
    onClose()
  }
  
  const handleSubmit = (val) => {
    val.preventDefault();
    const isEdit = defaultValue.title;
    
    if (isEdit) {
      editSubmit({
        id: defaultValue.id,
        title: value.title,
        link: value.link,
        image: value.image
      })
    } else {
      const formData = new FormData();
      formData.append('image', value.image[0])
      addSubmit({
        title: value.title,
        link: value.link,
        image:formData
      })
    }
  }

  useEffect(() => {
    if (!defaultValue) return;

    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-row justify-center uppercase">
              Create New Partner
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={8}>
              <div className="flex flex-col">
                <FormControl isRequired mt={4}>
                  <FormLabel>TITLE</FormLabel>
                  <InputGroup>
                    <Input
                      type='text'
                      placeholder="Title"
                      value={value.title || ""}
                      onChange={(e) =>
                        handleChange('title', e.target.value)
                      }
                    />
                  </InputGroup>
                </FormControl>
                  <FormControl isRequired mt={4}>
                  <FormLabel>LINK</FormLabel>
                  <InputGroup>
                    <Input
                      type='text'
                      placeholder="LINK"
                      value={value.link || ""}
                      onChange={(e) =>
                        handleChange('link', e.target.value)
                      }
                    />
                  </InputGroup>
                </FormControl>
                  <FormControl>
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
                            handleChange('image',e.target.files)
                          }
                          multiple
                          className="hidden"
                        />
                      </label>
                      <Stack mt={4} spacing={2}>
                        {value.image && value.image.length !== 0 && (
                          <Box
                            key={value.image[0]?.name}
                            borderWidth="2px"
                            borderRadius="xl"
                            p={2}
                            display="flex"
                            alignItems="center"
                          >
                            <Image
                              src={
                                typeof value?.image[0] === "string"
                                  ? `${process.env.REACT_APP_API_IMAGE}/${value?.image}`
                                  : URL.createObjectURL(value?.image[0])
                              }
                              alt="Preview"
                              maxH="80px"
                              maxW="80px"
                              mr={2}
                            />
                            <Text fontSize="sm">{value.image[0].name ?? value.image}</Text>
                            <Button
                              colorScheme="red" 
                              size="sm"
                              onClick={(e) =>
                                handleChange('image', e.target.files)
                              }
                              ml="auto"
                            >
                              <MdDelete />
                            </Button> 
                          </Box>
                        )}
                      </Stack>
                    </Box>
                  </FormControl>
                </div>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

  export default PartnerAddEdit;