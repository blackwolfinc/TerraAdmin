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
  ModalCloseButton,
  Select,
  InputRightElement,
  Button,
  InputGroup,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

const UserModal = (props) => {
  const { isOpen, onClose, onSubmit, defaultValue } = props;

  const [isError, setIsError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [value, setValue] = React.useState({});

  React.useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  React.useEffect(() => {
    setIsError(false);
  }, [value]);

  const handleCancel = () => {
    setValue({});
    setShowPassword(false);
    setIsError(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value?.password === "") delete value.password;
    if (value?.phone === "") delete value.phone;
    if (value?.role === "") delete value.role;
    delete value.createdAt;
    delete value.updatedAt;

    // Check Required
    if (
      (!value?.id &&
        value?.name &&
        value?.email &&
        value?.password &&
        value?.role) ||
      (value?.id && value?.name && value?.email && value?.role)
    ) {
      onSubmit(value);
      // For reset and close modal
      handleCancel();
    } else {
      setIsError(true);
    }
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
        <ModalHeader>{value?.id ? "EDIT" : "ADD"} USER</ModalHeader>
        <ModalCloseButton onClick={handleCancel} />
        <hr />
        <ModalBody>
          <FormControl isRequired mt={4} isInvalid={isError}>
            <FormLabel>Fullname</FormLabel>
            <Input
              type="text"
              placeholder="Fullname"
              name="name"
              value={value.name || ""}
              onChange={handleChange}
            />
            {isError && (
              <FormErrorMessage>Fullname is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired mt={4} isInvalid={isError}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={value.email || ""}
              onChange={handleChange}
            />
            {isError && <FormErrorMessage>Email is required.</FormErrorMessage>}
          </FormControl>
          <FormControl isRequired mt={4} isInvalid={isError}>
            <FormLabel>Phone</FormLabel>
            <Input
              type="number"
              placeholder="Phone"
              name="phone"
              value={value.phone || ""}
              onChange={handleChange}
            />
            {isError && <FormErrorMessage>Phone is required.</FormErrorMessage>}
          </FormControl>
          <FormControl
            isRequired={!value?.id}
            mt={4}
            isInvalid={!value.id && isError}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={value.password || ""}
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {!value.id && isError && (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
            {value.id && (
              <FormHelperText>
                Leave password blank if you don't want to change the password.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl isRequired mt={4} isInvalid={isError}>
            <FormLabel>Role</FormLabel>
            <Select
              placeholder="Select Role"
              name="role"
              value={value.role || "ADMIN"}
              onChange={handleChange}
            >
              <option value="SUPER ADMIN" disabled>
                Superadmin
              </option>
              <option value="ADMIN">Admin</option>
            </Select>
            {isError && <FormErrorMessage>Role is required.</FormErrorMessage>}
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

export default UserModal;
