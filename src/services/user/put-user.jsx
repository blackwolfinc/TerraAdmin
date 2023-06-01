import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "../../utils/http";

const updateUserData = async (input) => {
  return await http.patch(API_ENDPOINT.UPDATE_USER + input.id, input.body);
};

const useUpdateUserMutation = () => {
  return useMutation(updateUserData);
};

export { useUpdateUserMutation, updateUserData };
