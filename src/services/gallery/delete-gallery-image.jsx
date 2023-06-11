import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "../../utils/http";

const deleteGalleryImageData = async (id) => {
  return await http.delete(API_ENDPOINT.DELETE_GALLERY_IMAGE + id);
};

const useDeleteGalleryImageMutation = () => {
  return useMutation(deleteGalleryImageData);
};

export { useDeleteGalleryImageMutation, deleteGalleryImageData };
