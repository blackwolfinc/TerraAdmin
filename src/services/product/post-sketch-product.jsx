import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "../../utils/http";

const uploadSketchProductData = async (input) => {
  const formData = new FormData();
  formData.append("image", input.image);
  
  return await http.post(
    API_ENDPOINT.UPLOAD_SKETCH_PRODUCT + input.id,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const useUploadSketchProductMutation = () => {
  return useMutation(uploadSketchProductData);
};

export { useUploadSketchProductMutation, uploadSketchProductData };
