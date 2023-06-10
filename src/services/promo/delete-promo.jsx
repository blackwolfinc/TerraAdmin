import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const deletePromoData = async (id) => {
  return await http.delete(`${API_ENDPOINT.DELETE_PROMO}/${id || ""}`);
};

const useDeletePromoMutation = () => {
  return useMutation(deletePromoData);
};

export { useDeletePromoMutation, deletePromoData };
