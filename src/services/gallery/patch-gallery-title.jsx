import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const editGalleryTitleData = async ({ id, title }) => {
  return await http.patch(API_ENDPOINT.PATCH_GALLERY_TITLE + id, {
    title:title
  });
};

const useEditGalleryTitleMutation = () => {
  return useMutation(editGalleryTitleData);
};

export { useEditGalleryTitleMutation, editGalleryTitleData };
