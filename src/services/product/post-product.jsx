import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "../../utils/http";

const createProductData = async (input) => {
  return await http.post(API_ENDPOINT.CREATE_PRODUCT, input);
};

const useCreateProductMutation = () => {
  return useMutation(createProductData);
};

export { useCreateProductMutation, createProductData };
