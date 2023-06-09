import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const uploadImagesBlogData = async ({ id, data }) => {
  return await http.post(API_ENDPOINT.POST_IMAGE_BLOG + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const useUploadImagesBlogMutation = () => {
  return useMutation(uploadImagesBlogData);
};

export { useUploadImagesBlogMutation, uploadImagesBlogData };
