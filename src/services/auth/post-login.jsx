import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const postLogin = async (data) => {
  return await http.post(API_ENDPOINT.LOGIN, data);
};

const usePostLoginMutation = () => {
  return useMutation(postLogin);
};

export { usePostLoginMutation, postLogin };
