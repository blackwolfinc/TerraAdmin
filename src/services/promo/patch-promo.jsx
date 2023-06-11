import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const editPromo = async ({ id, data }) => {
  return await http.patch(`${API_ENDPOINT.PATCH_PROMO}/${id}`, data);
};

const useEditPromoMutation = () => {
  return useMutation(editPromo);
};

export { useEditPromoMutation, editPromo };
