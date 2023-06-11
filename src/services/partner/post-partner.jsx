import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const createPartnerData = async (input) => {
  return await http.post(API_ENDPOINT.POST_PARTNER, input);
};

const useCreatePartnerMutation = () => {
  return useMutation(createPartnerData);
};

export { useCreatePartnerMutation, createPartnerData };
