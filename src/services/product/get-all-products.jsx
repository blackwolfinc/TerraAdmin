import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const fetchProductsData = async ({ queryKey }) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(_key, { params: _params });
  return {
    data: data,
  };
};

const useProductsDataQuery = (options) => {
  return useQuery([API_ENDPOINT.GET_PRODUCTS, options], fetchProductsData);
};

export { useProductsDataQuery, fetchProductsData };
