import React from "react";
import { UserContext } from "context/UserContext";
import Card from "components/card";
import { useUserDataQuery } from "services/user/get-user";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  InputRightElement,
  Button,
  InputGroup,
  FormHelperText,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { useUpdateUserMutation } from "services/user/put-user";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = React.useContext(UserContext);
  const { data: fetchUser, refetch: refetchUser } = useUserDataQuery(user.id);
  const { mutate: updateUser } = useUpdateUserMutation();

  const [isError, setIsError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [value, setValue] = React.useState({});

  React.useEffect(() => {
    if (!fetchUser) return;
    setValue(fetchUser.data);
  }, [fetchUser]);

  React.useEffect(() => {
    setIsError(false);
  }, [value]);

  const handleReset = () => {
    setValue(fetchUser.data);
    setShowPassword(false);
    setIsError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError(false);

    delete value.createdAt;
    delete value.updatedAt;

    // For Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password minimal 8 characters
    const passwordRegex = /^.{8,}$/;

    // // Check Required
    if (
      value?.name?.length > 0 &&
      emailRegex.test(value?.email) &&
      passwordRegex.test(value?.password) &&
      value?.phone?.length > 0 &&
      value?.role?.length > 0
    ) {
      const id = value.id;
      delete value.id;
      delete value.role;
      updateUser(
        {
          id: id,
          body: value,
        },
        {
          onSuccess: () => {
            setShowPassword(false);
            refetchUser();
            toast.success("Update user success!");
          },
          onError: (err) => {
            toast.error("Update user failed!");
          },
        }
      );
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
    <div className="mt-3">
      <Card extra={"w-full pb-10 p-4 h-full"}>
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            PROFILE SETTING
          </div>
        </header>
        <div className="mt-4 overflow-x-scroll px-1 xl:overflow-x-hidden">
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
          <FormControl
            isRequired
            mt={4}
            isInvalid={user.role === "SUPER ADMIN" && isError}
            isDisabled={user.role === "ADMIN"}
          >
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={value.email || ""}
              onChange={handleChange}
            />
            {user.role === "SUPER ADMIN" && isError && (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
            {user.role === "ADMIN" && (
              <FormHelperText>
                Only Super Admin can change the email.
              </FormHelperText>
            )}
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
          <FormControl isRequired mt={4} isInvalid={isError}>
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
            {isError && (
              <FormErrorMessage>
                Password must be at least 8 characters.
              </FormErrorMessage>
            )}
            {value.id && (
              <FormHelperText>
                Leave password blank if you don't want to change the password.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl isRequired mt={4} isDisabled>
            <FormLabel>Role</FormLabel>
            <Select
              placeholder="Select Role"
              name="role"
              value={value.role || setValue({ ...value, role: "ADMIN" })}
              onChange={handleChange}
            >
              <option value="SUPER ADMIN">Superadmin</option>
              <option value="ADMIN">Admin</option>
            </Select>
            {user.role === "ADMIN" && (
              <FormHelperText>
                Only Super Admin can change the role.
              </FormHelperText>
            )}
          </FormControl>
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <button
              type="submit"
              onClick={handleSubmit}
              className="linear mr-3 rounded-xl bg-brand-500 px-8 py-2 text-center text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
            >
              SAVE
            </button>
            <button
              onClick={handleReset}
              className="linear rounded-xl bg-gray-100 px-6 py-2 text-center text-base font-medium text-gray-800 transition duration-200 hover:bg-gray-300 active:bg-gray-400"
            >
              CLEAR
            </button>
          </Box>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
