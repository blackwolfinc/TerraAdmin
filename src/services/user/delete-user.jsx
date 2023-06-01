import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "../../utils/http";

const deleteUserData = async (id) => {
  return await http.delete(API_ENDPOINT.DELETE_USER + id);
};

const useDeleteUserMutation = () => {
  return useMutation(deleteUserData);
};

export { useDeleteUserMutation, deleteUserData };
