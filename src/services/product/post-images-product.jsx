import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "../../utils/http";

const uploadImagesProductData = async (input) => {
  const formData = new FormData();
  input.image.forEach((image) => {
    formData.append("image", image);
  });

  return await http.post(
    API_ENDPOINT.UPLOAD_IMAGES_PRODUCT + input.id,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const useUploadImagesProductMutation = () => {
  return useMutation(uploadImagesProductData);
};

export { useUploadImagesProductMutation, uploadImagesProductData };
