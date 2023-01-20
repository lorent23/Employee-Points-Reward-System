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
import Dashboard from "../pages/Dashboard.jsx";
import DefaultLayout from "../layouts/DefaultLayout.jsx";
import PublicLayout from "../layouts/PublicLayout.jsx";
import UsersList from "../pages/Users/UsersList.jsx";
import CompaniesList from "../pages/Companies/CompaniesList.jsx";
import ForgotPassword from "../components/forgottenpassword/ForgottenPassword.jsx";
import ChangingPassword from "../components/changepassword/ChangePassword.jsx";
import VerifyEmail from "../components/verifyemail/VerifyEmail.jsx";
import CrtCompany from "../components/createcompany/CreateCompany.jsx";

const ProtectedRoutes = ({ token }) => {
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Insert layout here. Sidebar, Header, Footer, etc.
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

const Router = () => {
  const token = useSelector((state) => state.auth.token);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoutes token={token} />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "users",
          element: <UsersList />,
        },
        {
          path: "companies",
          element: <CompaniesList />,
        },
        {
          path: "create-company",
          element: <CrtCompany />,
        },
      ],
    },
    {
      path: "*",
      element: <PublicLayout token={token} />,
      children: [
        {
          path: "login",
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
          path: "reset-password/:userId/:token",
          element: <ChangingPassword />,
        },
        {
          path: "verify-email/:userId/:token",
          element: <VerifyEmail />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} fallback={<div>Loading...</div>} />;
};

export default Router;
