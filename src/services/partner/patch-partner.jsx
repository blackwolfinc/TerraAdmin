import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const editPartnerData = async ({ id, title, link }) => {
  return await http.patch(API_ENDPOINT.PATCH_PARTNER + id, {
    title: title,
    link:link
  });
};

const useEditPartnerMutation = () => {
  return useMutation(editPartnerData);
};

export { useEditPartnerMutation, editPartnerData };
