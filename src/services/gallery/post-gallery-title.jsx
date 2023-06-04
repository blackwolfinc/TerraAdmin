import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const createGalleryTitleData = async (input) => {
  return await http.post(API_ENDPOINT.POST_GALLERY_TITLE, input);
};

const useCreateGalleryTitleMutation = () => {
  return useMutation(createGalleryTitleData);
};

export { useCreateGalleryTitleMutation, createGalleryTitleData };
