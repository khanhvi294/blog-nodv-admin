import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import SuspenseProgress from "../components/SuspenseProgress";
import DefaultLayout from "../layouts/DefaultLayout";
import ProtectedRoutes from "./ProtectedRouter";
import PublicRouter from "./PublicRouter";

const UserPage = lazy(() => import("../pages/users/UserPage"));
const HomePage = lazy(() => import("../pages/home/HomePage"));
const PostPage = lazy(() => import("../pages/posts/PostPage"));
const ReportPage = lazy(() => import("../pages/reports/ReportPage"));
const NotificationPage = lazy(() =>
  import("../pages/notifications/NotificationPage")
);
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RedirectLogin = lazy(() => import("../pages/auth/RedirectLogin"));
const Logout = lazy(() => import("../pages/auth/Logout"));

export const appRoutes = {
  HOME: "/",
  USER: "/users",
  POST: "/posts",
  REPORT: "/reports",
  AUTH_LOGIN: "/login",
  NOTIFICATIONS: "/notifications",
  PROFILE: "/profile",
  AUTH_REDIRECT: "/oauth2/redirect",
  AUTH_LOGOUT: "/logout",
};

const AppRoutes = () => {
  let element = useRoutes([
    {
      element: <ProtectedRoutes />,
      children: [
        {
          element: <DefaultLayout />,
          protected: true,
          children: [
            {
              path: appRoutes.HOME,
              element: <HomePage />,
              exact: true,
            },
            {
              path: appRoutes.USER,
              element: <UserPage />,
            },
            {
              path: appRoutes.POST,
              element: <PostPage />,
            },
            {
              path: appRoutes.REPORT,
              element: <ReportPage />,
            },
            { path: appRoutes.NOTIFICATIONS, element: <NotificationPage /> },
            {
              path: appRoutes.PROFILE,
              element: <ProfilePage />,
            },
          ],
        },
        {
          element: <Logout />,
          protected: true,
          path: appRoutes.AUTH_LOGOUT,
        },
      ],
    },
    {
      element: <PublicRouter />,
      children: [
        {
          path: appRoutes.AUTH_LOGIN,
          element: <LoginPage />,
          protected: false,
        },
        {
          path: appRoutes.AUTH_REDIRECT,
          element: <RedirectLogin />,
          protected: false,
        },
      ],
    },
  ]);
  return <SuspenseProgress> {element} </SuspenseProgress>;
};

export default AppRoutes;
