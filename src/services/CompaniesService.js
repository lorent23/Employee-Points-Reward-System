import ApiFactory from "../factories/ApiFactory.js";
import { serialize } from "../utilities/querySerialize";
import { useMutation } from "react-query";

const companyList = ({ queryKey }) => {
  const [_key, filters] = queryKey;
  return new Promise((resolve, reject) => {
    ApiFactory.get(`/companies?${serialize(filters)}`).then(
      (success) => resolve(success.data),
      (error) => reject(error)
    );
  });
};

const deleteCompany = (id) => {
  return new Promise((resolve, reject) => {
    ApiFactory.delete(`/companies/${id}`).then(
      (success) => resolve(success.data),
      (error) => reject(error)
    );
  });
};

export const useCreateCompany = () => {
  return useMutation((payload) => {
    return new Promise((resolve, reject) => {
      return ApiFactory.post("/companies", payload).then(
        (success) => resolve(success.data),
        (error) => reject(error)
      );
    });
  });
};

export const useUpdateCompany = () => {
  return useMutation((payload) => {
    return new Promise((resolve, reject) => {
      return ApiFactory.put(`/companies/${payload.id}`, payload).then(
        (success) => resolve(success.data),
        (error) => reject(error)
      );
    });
  });
};

export default {
  companyList,
  deleteCompany,
  useCreateCompany,
  useUpdateCompany,
};
