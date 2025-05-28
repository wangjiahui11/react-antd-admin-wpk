import loadable from "@loadable/component";

const ActivityList = loadable(() => import("@/pages/activity/index"));
const ActivityDetail = loadable(() => import("@/pages/activity/detail"));

const activityRoutes = [
  {
    index: true,
    label: "公告列表",
    element: <ActivityList />,
    key: "/activity",
  },
  {
    path: "detail/:id?",
    label: "公告详情",
    isShow: true,
    element: <ActivityDetail />,
    key: "/activity/detail",
  },
];

export default activityRoutes;
