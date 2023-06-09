import { useEffect, useState } from "react";
import { 
  Box,
  Button, FormControl, FormLabel, Image, Input, InputGroup,
  Modal, ModalBody, ModalCloseButton, 
  ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text 
} from "@chakra-ui/react";
import { MdDelete, MdFileUpload } from "react-icons/md";

const GalleryAddEdit = ({
  isOpen, onClose, defaultValue,
  addSubmit, editSubmit, refetchShowGallery
}) => {

  const [value, setValue] = useState({});

  const handleChange = (key, data) => {
    setValue({ ...value, [key]: data });
  };

  const handleClose = () => {
    setValue({
      title: '',
      description:'',
      galleryImages:[]
    })
    onClose()
  }
  
  const handleSubmit = (val) => {
    val.preventDefault();
    const isEdit = defaultValue.title;
    let deleteImages = []
    
    if (isEdit) {
      if (defaultValue.galleryImages?.length > 0) {
        const imagesDefault = value.galleryImages.map(v => v.id)
        deleteImages = defaultValue.galleryImages
          .filter((item) => item.id).filter(v => !imagesDefault.includes(v.id) );
      }
      

      const newImages = value.galleryImages.filter((item) =>
        item instanceof File 
      );
      const formData = new FormData();
      newImages.forEach((img) => { formData.append('image', img); });
      editSubmit({
        id: defaultValue.id,
        title: value.title,
        description: value.description,
        galleryImages: formData,
        imagesDelete: deleteImages
      })
    } else {
      const formData = new FormData();
      value.galleryImages.forEach((img) => { formData.append('image', img); });
      addSubmit({
        title: value.title,
        description: value.description,
        galleryImages:formData,
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
              Create New Gallery
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={8}>
              <div className="flex flex-col">
                <FormControl isRequired mt={4}>
                  <FormLabel>Title</FormLabel>
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
                  <FormLabel>Description</FormLabel>
                  <InputGroup>
                    <Input
                      type='text'
                      placeholder="Description"
                      value={value.description || ""}
                      onChange={(e) =>
                        handleChange('description', e.target.value)
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
                            setValue({
                              ...value,
                              galleryImages: [...value.galleryImages, ...Array.from(e.target.files)]
                            })
                          }
                          multiple
                          className="hidden"
                        />
                      </label>
                      <Stack mt={4} spacing={2}>
                        {value.galleryImages && value.galleryImages.map( (file, i) =>
                          <Box
                            key={i}
                            borderWidth="2px"
                            borderRadius="xl"
                            p={2}
                            display="flex"
                            alignItems="center"
                          >
                            <Image
                              src={
                                typeof file.image_path === 'string'
                                  ? `${process.env.REACT_APP_API_IMAGE}/${file.image_path}`
                                  : window.URL.createObjectURL(file)
                              }
                              alt="Preview"
                              maxH="80px"
                              maxW="80px"
                              mr={2}
                            />
                            <Text isTruncated fontSize="sm">
                              {file.image_path ? file.image_path : file.name}
                            </Text>
                            <Button
                              colorScheme="red"
                              size="sm"
                              onClick={(e) =>
                                setValue({
                                 ...value,
                                  galleryImages: value.galleryImages.filter(
                                    (selectedFile) => selectedFile !== file
                                  )
                                })
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

export default GalleryAddEdit;