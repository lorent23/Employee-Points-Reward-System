import ApiFactory from "../factories/ApiFactory.js";
import {useMutation} from "react-query";

const paramsid = 1;
export const useUpdateRate = () => {
    return useMutation((payload) => {
        return new Promise((resolve, reject) => {
            return ApiFactory
                .put(`/exchange/1`, payload)
                .then((success) => resolve(success.data), (error) => reject(error));
        });
    });
  };


  export default {
    useUpdateRate,
  };