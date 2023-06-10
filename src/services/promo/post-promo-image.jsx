import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const uploadImagesPromoData = async ({ id, data }) => {
  return await http.post(API_ENDPOINT.POST_IMAGE_PROMO + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const useUploadImagesPromoMutation = () => {
  return useMutation(uploadImagesPromoData);
};

export { useUploadImagesPromoMutation, uploadImagesPromoData };
