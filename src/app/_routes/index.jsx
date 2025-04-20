import Login1 from "@app/pages/auth/login1";
import { createBrowserRouter, Navigate } from "react-router-dom";
import SamplePage from "@app/pages";
import { StretchedLayout } from "@app/_layouts/StretchedLayout";
import { SoloLayout } from "@app/_layouts/SoloLayout";
import { Page } from "@app/_components/_core/Page";
import withAuth from "@app/_hoc/withAuth";
import { NotFound } from "@app/_components/_core/NotFound";
import FireComplaintForm from "../Firestation/pages/FireForm";
import FireDashboard from "../Firestation/pages/Home";

const routes = [
  {
    path: '/',
    element: <Navigate to="/dashboards" replace />,
  },
  {
    path: '/dashboards',
    element: <StretchedLayout />,
    children: [
      {
        path: 'fire-complaint',
        element: <Page Component={FireComplaintForm} hoc={withAuth} />,
      },
      {
        path: '',
        element: <Page Component={FireDashboard} hoc={withAuth} />,
      },
    ],
  },
  {
    path: '/auth',
    element: <SoloLayout />,
    children: [
      {
        path: 'login-1',
        element: <Login1 />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];


export const router = createBrowserRouter(routes, { basename: "/upfs" });