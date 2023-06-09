import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const deleteBlogData = async (id) => {
  return await http.delete(`${API_ENDPOINT.DELETE_BLOG}/${id || ""}`);
};

const useDeleteBlogMutation = () => {
  return useMutation(deleteBlogData);
};

export { useDeleteBlogMutation, deleteBlogData };
