import { useMutation } from "react-query";
import ApiFactory from "../factories/ApiFactory.js";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/slices/authSlice.js";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return useMutation((payload) => {
    return ApiFactory.post("/auth/login", payload).then((res) => {
      dispatch(setAuth(res.data));
      navigate(from, { replace: true });
    });
  });
};

export const ForgottenPassword = () => {
  return useMutation((payload) => {
    return new Promise((resolve, reject) => {
      return ApiFactory.post("/auth/reset-password", payload).then(
        (success) => resolve(success.data),
        (error) => reject(error)
      );
    });
  });
};

export const ChangePassword = () => {
  const params = useParams();
  return useMutation((payload) => {
    return new Promise((resolve, reject) => {
      return ApiFactory.post(
        `/auth/reset-password/${params.userId}/${params.token}`,
        payload
      ).then(
        (success) => resolve(success.data),
        (error) => reject(error)
      );
    });
  });
};

export const VerifyAccount = () => {
  const params = useParams();
  return useMutation((payload) => {
    return new Promise((resolve, reject) => {
      return ApiFactory.get(
        `/auth/verify-email/${params.userId}/${params.token}`,
        payload
      ).then(
        (success) => resolve(success.data),
        (error) => reject(error)
      );
    });
  });
};
