import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../utils/api-endpoint";
import http from "utils/http";

const fetchGalleryData = async ({ queryKey }) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(_key, { params: _params });
  return {
    data: data,
  };
};

const useGalleryDataQuery = (options) => {
  return useQuery([API_ENDPOINT.GET_ALL_GALLERY, options], fetchGalleryData);
};

export { useGalleryDataQuery, fetchGalleryData };
