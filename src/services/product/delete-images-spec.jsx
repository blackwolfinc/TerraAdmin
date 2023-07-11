import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "../../utils/http";

const deleteImagesSpecData = async (value) => {
  return await http.delete(API_ENDPOINT.DELETE_IMAGES_SPEC + value);
};

const useDeleteImagesSpecMutation = () => {
  return useMutation(deleteImagesSpecData);
};

export { useDeleteImagesSpecMutation, deleteImagesSpecData };
