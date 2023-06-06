import React from "react";
import {
  Navigate,
  useLocation,
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/Login.jsx";
import DefaultLayout from "../layouts/DefaultLayout.jsx";
import PublicLayout from "../layouts/PublicLayout.jsx";
import UsersList from "../pages/Users/UsersList.jsx";
import UserOnly from "../pages/Users/UserOnly.jsx";
import ForgotPassword from "../components/forgottenpassword/ForgottenPassword.jsx";
import ChangingPassword from "../components/changepassword/ChangePassword.jsx";
import VerifyEmail from "../components/verifyemail/VerifyEmail.jsx"
import PointsList from "../pages/Points/PointsList.jsx";
import PointsOnly from "../pages/Points/PointsOnly.jsx";
import ExchangeRate from "../pages/ExchangeRate/ExchangeRate.jsx";


const ProtectedRoutes = ({ token }) => {
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

const Router = () => {
  const token = useSelector((state) => state.auth.token);
  const roleId = useSelector((state) => state.auth.user.roleId);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoutes token={token}  />,
      children: [
        {
          path: `/points/user`,
          element: <PointsList />
        },
        {
          path: `/points/only`,
          element: <PointsOnly />
        },
        {
          path: `/user`,
          element: <UserOnly/>
        },
        {
          path: `/exchangeRate`,
          element: roleId === 1 ? <ExchangeRate/> : <Navigate to="/user" replace />,
        },
        {
          path: "users",
          element: roleId === 1 ? <UsersList/> : <Navigate to="/user" replace />,
        },
      ],
    },
    {
      path: "*",
      element: <PublicLayout token={token} />,
      children: [
        {
          path: "*",
          element: !token ? <Login /> : <Navigate to="/" replace />,
        },
        {
          path: "*",
          element: <Navigate to="/" replace />,
        },
        {
          path: "forgotten-password",
          element: <ForgotPassword />,
        },
        {
          path: "api/auth/reset-password/:userId/:token",
          element: <ChangingPassword />,
        },
        {
          path: "api/auth/verify-email/:userId/:token",
          element: <VerifyEmail />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} fallback={<div>Loading...</div>} />;
};

export default Router;
