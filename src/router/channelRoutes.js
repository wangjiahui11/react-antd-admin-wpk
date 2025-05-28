import loadable from "@loadable/component";
// import accountsRoutes from "./account";
// import { dataMovieRoutes, dataShorttvRoutes, dataNovelRoutes } from "./data";
// import activityRoutes from "./activity";
import commonsRoutes from "./commons";

const Home = loadable(() => import("@/pages/Home"));

// import RoleComponent from '@/components/RoleComponent'


// import Dashboard from '@/pages/Dashboard'
// import Analysis from '@/pages/Dashboard/components/Analysis'
// import WorkPlatform from '@/pages/Dashboard/components/WorkPlatform'

// import NestedRoute from '@/pages/NestedRoute'
// import FirstRoute from '@/pages/NestedRoute/components/FirstRoute'
// import SecondRoute from '@/pages/NestedRoute/components/SecondRoute'
// import SecondChildRoute from '@/pages/NestedRoute/components/SecondRoute/childRoute'

// import Common from '@/pages/Common'
// import Table from '@/pages/Common/components/Table'
// import Form from '@/pages/Common/components/Form'

const channelRoutes = [
  {
    path: "/homepage",
    element: <Home />,
    label: "首页",
    key: "/homepage",
  },
  {
    path: "/common",
    label: "账户",
    key: "/common",
    children: commonsRoutes,
  },
  // {
  //   path: "/help",
  //   label: "帮助中心",
  //   key: "/help",
  //   isShow: true,
  //   element: <Help />,
  // },
  // {
  //   path: "/message",
  //   label: "消息中心",
  //   key: "/message",
  //   isShow: true,
  //   element: <Message />,
  // },
  // {
  //   path: "/activity",
  //   label: "公告",
  //   children: activityRoutes,
  // },
  // {
  //   path: "/settlement",
  //   label: "结算",
  //   key: "/settlement",
  //   children: settlementRoutes,
  // },
];

export default channelRoutes;
