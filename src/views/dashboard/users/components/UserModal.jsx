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
} from "@chakra-ui/react";

const UserModal = (props) => {
  const { isOpen, onClose, onSubmit, defaultValue } = props;

  const [showPassword, setShowPassword] = React.useState(false);

  const [value, setValue] = React.useState(
    defaultValue || {
      username: "",
      password: "",
      role: "",
    }
  );

  React.useEffect(() => {
    if (!defaultValue) return;

    setValue(defaultValue);
  }, [defaultValue]);

  const handleCancel = () => {
    setValue({
      username: "",
      password: "",
      role: "",
    });
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
    setValue({
      username: "",
      password: "",
      role: "",
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
        <ModalHeader>{defaultValue?.id ? "EDIT" : "ADD"} USER</ModalHeader>
        <ModalCloseButton onClick={handleCancel} />
        <hr />
        <ModalBody>
          <FormControl isRequired mt={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Username"
              value={value.username || ""}
              onChange={(e) => setValue({ ...value, username: e.target.value })}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={value.password || ""}
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
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
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Role</FormLabel>
            <Select
              placeholder="Select Role"
              value={value.role || setValue({ ...value, role: "superadmin" })}
              onChange={(e) => setValue({ ...value, role: e.target.value })}
            >
              <option value="superadmin">Superadmin</option>
              <option value="admin">Admin</option>
            </Select>
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

export default UserModal;
