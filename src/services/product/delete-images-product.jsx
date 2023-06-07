import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "../../utils/http";

const deleteImagesProductData = async (id) => {
  return await http.delete(API_ENDPOINT.DELETE_IMAGES_PRODUCT + id);
};

const useDeleteImagesProductMutation = () => {
  return useMutation(deleteImagesProductData);
};

export { useDeleteImagesProductMutation, deleteImagesProductData };
