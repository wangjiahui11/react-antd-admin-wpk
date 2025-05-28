import loadable from "@loadable/component";

const Table = loadable(() => import("@/pages/Common/components/Table"));
const Form = loadable(() => import("@/pages/Common/components/Form"));

const accountsRoutes = [
  {
    path: "table",
    label: "开通账户",
    element: <Table />,
    isShow: true,
    key: "/common/table",
  },
  {
    path: "form",
    label: "账户详情",
    element: <Form />,
    isShow: true,
    key: "/common/form",
  },
];

export default accountsRoutes;
