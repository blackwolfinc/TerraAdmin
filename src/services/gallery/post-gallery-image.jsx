import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const createGalleryImageData = async ({id, image}) => {
  return await http.post(
    API_ENDPOINT.POST_GALLERY_IMAGE + id,
    image,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const useCreateGalleryImageMutation = () => {
  return useMutation(createGalleryImageData);
};

export { useCreateGalleryImageMutation, createGalleryImageData };
