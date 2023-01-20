import ApiFactory from "../factories/ApiFactory.js";
import { serialize } from "../utilities/querySerialize";

const list = ({ filters }) => {
  const query = {
    ...filters,
  };
  return new Promise((resolve, reject) => {
    ApiFactory.get(`/users?${serialize(query)}`).then(
      (success) => resolve(success.data),
      (error) => reject(error)
    );
  });
};

export default {
  list,
};
