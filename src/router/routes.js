import loadable from "@loadable/component";
import { DesktopOutlined, FileOutlined, TeamOutlined } from "@ant-design/icons";
import channelRoutes from "./channelRoutes";
import { Navigate } from "react-router-dom";

const Login = loadable(() => import("@/pages/Login"));
const Layout = loadable(() => import("@/components/Layout"));
const Page404 = loadable(() => import("@/pages/404"));

const routes = [
  {
    index: true,
    name: "Login",
    element: <Navigate to="/login" />,
  },
  {
    path: "/",
    element: <Layout />,
    label: "系统",
    key: "system",
    icon: <FileOutlined />,
    children: [...channelRoutes],
  },
  {
    path: "/login",
    element: <Login />,
    label: "登录",
    key: "/login",
    icon: <DesktopOutlined />,
  },
  {
    path: "/404",
    element: <Page404 />,
    label: "404",
    key: "404",
    icon: <TeamOutlined />,
  },
  {
    path: "*",
    element: <Page404 />,
    label: "404",
    key: "404",
    icon: <TeamOutlined />,
  },
];

export default routes;
