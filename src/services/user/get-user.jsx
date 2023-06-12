import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "utils/api-endpoint";
import http from "utils/http";

const fetchUserData = async (id) => {
  const { data } = await http.get(API_ENDPOINT.GET_USER + id);
  return data;
};

const useUserDataQuery = (id) => {
  return useQuery(["userData", id], () => fetchUserData(id));
};

export { useUserDataQuery, fetchUserData };
