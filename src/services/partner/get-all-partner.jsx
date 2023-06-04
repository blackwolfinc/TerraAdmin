import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const fetchPartnerData = async ({ queryKey }) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(_key, { params: _params });
  return {
    data: data,
  };
};

const usePartnerDataQuery = (options) => {
  return useQuery([API_ENDPOINT.GET_ALL_PARTNER, options], fetchPartnerData);
};

export { usePartnerDataQuery, fetchPartnerData };
