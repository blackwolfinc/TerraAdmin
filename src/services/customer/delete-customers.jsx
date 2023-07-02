import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const deleteCustomersData = async (id) => {
  return await http.delete(`${API_ENDPOINT.DELETE_CUSTOMERS}/${id || ""}`);
};

const useDeleteCustomersMutation = () => {
  return useMutation(deleteCustomersData);
};

export { useDeleteCustomersMutation, deleteCustomersData };
