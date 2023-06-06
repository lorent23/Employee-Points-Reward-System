import ApiFactory from "../factories/ApiFactory.js";
import { serialize } from "../utilities/querySerialize";
import { useParams } from "react-router-dom";
import {useMutation} from "react-query";
import { useQuery } from "react-query";

const pointsList = ({ queryKey }) => {
  const [_key, filters] = queryKey;
  const params = useParams();
  return new Promise((resolve, reject) => {
    ApiFactory.get(`/points/user?id=${params.id}`).then(
      (success) => resolve(success.data),
      (error) => reject(error)
    );
  });
};

const deletePoint = (pointsId) => {
  return new Promise((resolve, reject) => {
      ApiFactory
          .delete(`/points/${pointsId}`)
          .then((success) => resolve(success.data), (error) => reject(error));
  });
};

export const useAddPoints = () => {
  return useMutation((payload) => {
      return new Promise((resolve, reject) => {
          return ApiFactory
              .post("/points/", payload)
              .then((success) => resolve(success.data), (error) => reject(error));
      });
  });
};

 const useUpdatePoints = () => {
    return useMutation((payload) => {
        return new Promise((resolve, reject) => {
            return ApiFactory
                .put(`/points/${payload.id}`, payload)
                .then((success) => resolve(success.data), (error) => reject(error));
        });
    });
  };


  export default {
    pointsList,
    deletePoint,
    useUpdatePoints
  };