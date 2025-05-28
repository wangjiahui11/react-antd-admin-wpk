import { createContext, useContext } from "react";
import UserStore from "./user.store";
import AuthStore from "./auth.store";

class RootStore {
  constructor() {
    this.userStore = new UserStore();
    this.authStore = new AuthStore();
  }
  clearAllInfo() {
    this.userStore.clearUserInfo();
    this.authStore.clearAuthInfo();
  }
}
const rootStore = new RootStore();

const context = createContext(rootStore);

const useStore = () => useContext(context);

export { useStore };
