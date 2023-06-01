import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "../../utils/http";

const createUserData = async (input) => {
  console.log(input);
  return await http.post(API_ENDPOINT.CREATE_USER, input);
};

const useCreateUserMutation = () => {
  return useMutation(createUserData);
};

export { useCreateUserMutation, createUserData };
