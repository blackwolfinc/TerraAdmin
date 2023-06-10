import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const fetchPromoData = async ({ queryKey }) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(_key, { params: _params });
  return data;
};

const usePromoDataQuery = (options) => {
  return useQuery([API_ENDPOINT.GET_PROMO, options], fetchPromoData);
};

export { usePromoDataQuery, fetchPromoData };
