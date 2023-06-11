import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const createPromoData = async (data) => {
  return await http.post(API_ENDPOINT.POST_PROMO, data);
};

const useCreatePromoMutation = () => {
  return useMutation(createPromoData);
};

export { useCreatePromoMutation, createPromoData };
