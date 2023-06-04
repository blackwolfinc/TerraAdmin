import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "../../utils/http";

const updateProductData = async (input) => {
  return await http.patch(API_ENDPOINT.CREATE_PRODUCT + input.id, input.body);
};

const useUpdateProductMutation = () => {
  return useMutation(updateProductData);
};

export { useUpdateProductMutation, updateProductData };
