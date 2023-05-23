// import { useQuery } from "react-query";
// import { API_ENDPOINTS } from "utils/api-endpoint";
// import http from "utils/http";

// const fetchUserData = async ({ queryKey }) => {
//   const [_key, _params] = queryKey;
//   const { data } = await http.get(_key, { params: _params });
//   return {
//     data: data,
//   };
// };

// const useUsersDataQuery = (options) => {
//   return useQuery([API_ENDPOINTS.GET_USERS, options], fetchUserData);
// };

// export { useUsersDataQuery, fetchUserData };
