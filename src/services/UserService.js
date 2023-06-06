import ApiFactory from "../factories/ApiFactory.js";
import { serialize } from "../utilities/querySerialize";
import {useMutation} from "react-query";

const list =async ({queryKey}) => {
   const [_key, filters, _resource, {search}] = queryKey;
  return new Promise((resolve, reject) => {
    ApiFactory.get(`/users?${search}`).then(
      (success) => resolve(success.data),
      (error) => reject(error)
    );
  });
};

// const list = async ({queryKey}) => {
//   const [_key, filters, _resource, {search}] = queryKey;
//   const response = await axios.get("/api/users", {
//     params: {
//       ...filters,
//       search: search,
//     }
//   });
//   return response.data;
// };

const deleteUser= (id) => {
  return new Promise((resolve, reject) => {
      ApiFactory
          .delete(`/users/${id}`)
          .then((success) => resolve(success.data), (error) => reject(error));
  });
};

const roles = ({ filters }) => {
  const query = {
    ...filters,
  };
  return new Promise((resolve, reject) => {
    ApiFactory.get(`/roles?${serialize(query)}`).then(
      (success) => resolve(success.data),
      (error) => reject(error)
    );
  });
};

export const useCreateUser = () => {
  return useMutation((payload) => {
      return new Promise((resolve, reject) => {
          return ApiFactory
              .post("/users", payload)
              .then((success) => resolve(success.data), (error) => reject(error));
      });
  });
};

export const useUpdateUser = () => {
  return useMutation((payload) => {
      return new Promise((resolve, reject) => {
          return ApiFactory
              .put(`/users/${payload.id}`, payload)
              .then((success) => resolve(success.data), (error) => reject(error));
      });
  });
};

export default {
  list,
  roles,
  useUpdateUser,
  useCreateUser,
  deleteUser
};