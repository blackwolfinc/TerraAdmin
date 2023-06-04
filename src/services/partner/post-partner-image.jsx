import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const createPartnerImageData = async ({id, image}) => {
  return await http.post(
    API_ENDPOINT.POST_PARTNER_IMAGE + id,
    image,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const useCreatePartnerImageMutation = () => {
  return useMutation(createPartnerImageData);
};

export { useCreatePartnerImageMutation, createPartnerImageData };
