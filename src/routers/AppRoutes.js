import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import SuspenseProgress from "../components/SuspenseProgress";
import DefaultLayout from "../layouts/DefaultLayout";

const UserPage = lazy(() => import("../pages/users/UserPage"));
const HomePage = lazy(() => import("../pages/home/HomePage"));
const PostPage = lazy(() => import("../pages/posts/PostPage"));
const ReportPage = lazy(() => import("../pages/reports/ReportPage"));
const WarningPage = lazy(() => import("../pages/warning/WarningPage"));
const NotificationPage = lazy(() =>
  import("../pages/notifications/NotificationPage")
);
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));

export const appRoutes = {
  HOME: "/",
  USER: "/users",
  POST: "/posts",
  REPORT: "/reports",
  WARNING: "/warning",
};

const AppRoutes = () => {
  let element = useRoutes([
    {
      element: <DefaultLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          exact: true,
        },
        {
          path: "/users",
          element: <UserPage />,
        },
        {
          path: "/posts",
          element: <PostPage />,
        },
        {
          path: "/reports",
          element: <ReportPage />,
        },
        {
          path: "/warnings",
          element: <WarningPage />,
        },
        { path: "/notifications", element: <NotificationPage /> },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
      ],
    },
  ]);
  return <SuspenseProgress> {element} </SuspenseProgress>;
};

export default AppRoutes;
