import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "../../utils/http";

const deleteProductData = async (id) => {
  return await http.delete(API_ENDPOINT.DELETE_PRODUCT + id);
};

const useDeleteProductMutation = () => {
  return useMutation(deleteProductData);
};

export { useDeleteProductMutation, deleteProductData };
