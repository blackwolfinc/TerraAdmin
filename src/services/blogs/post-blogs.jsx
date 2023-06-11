import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const createBlogData = async (data) => {
  return await http.post(API_ENDPOINT.POST_BLOG, data);
};

const useCreateBlogMutation = () => {
  return useMutation(createBlogData);
};

export { useCreateBlogMutation, createBlogData };
