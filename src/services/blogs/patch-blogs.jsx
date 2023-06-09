import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const editBlog = async ({ id, data }) => {
  return await http.patch(`${API_ENDPOINT.PATCH_BLOG}/${id}`, data);
};

const useEditBlogMutation = () => {
  return useMutation(editBlog);
};

export { useEditBlogMutation, editBlog };
