import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "../../utils/http";

const deletePartnerData = async (id) => {
  return await http.delete(API_ENDPOINT.DELETE_PARTNER + id);
};

const useDeletePartnerMutation = () => {
  return useMutation(deletePartnerData);
};

export { useDeletePartnerMutation, deletePartnerData };
