import { useNavigate, useLocation, useRoutes } from "react-router-dom";
import { useStore } from "@/store";
import channelRoutes from "./channelRoutes";
import { whiteRouteListFn } from "@/utils/util";

const RouteGuard = (props) => {
  let LoginWhiteList = whiteRouteListFn(channelRoutes);
  const WhiteList = ["/", "/login", "/404", "/register",'/homepage'];
  const { pathname } = useLocation();
  const { userStore, authStore } = useStore();
  const { authRouters = [] } = authStore;
  const { userId } = userStore?.userInfo;
  const navigate = useNavigate();

  // 判断是否在白名单及登录后的白名单中
  let isIncludeWhitelist = WhiteList.includes(pathname) || (LoginWhiteList.includes(pathname) && userId);

  if (!isIncludeWhitelist) {
    if (!authRouters?.length) {
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 50);
    } else {
      if (!authRouters.includes(pathname)) {
        navigate("/404", { replace: true });
      }
    }
  }
  return props.children;
};

export default RouteGuard;
