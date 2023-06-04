import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "../../utils/http";

const deleteGalleryData = async (id) => {
  return await http.delete(API_ENDPOINT.DELETE_GALLERY + id);
};

const useDeleteGalleryMutation = () => {
  return useMutation(deleteGalleryData);
};

export { useDeleteGalleryMutation, deleteGalleryData };
