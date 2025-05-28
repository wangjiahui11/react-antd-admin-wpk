import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class AuthStore {
  authoritys = [];
  authRouters = [];
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "auth",
      properties: ["authoritys", "authRouters"],
      storage: localStorage,
    });
  }
  setAuthoritys(auths) {
    this.authoritys = auths;
  }
  setAuthRouters(routers) {
    this.authRouters = routers;
  }

  clearAuthInfo() {
    this.authoritys = [];
    this.authRouters = [];
  }
}

export default AuthStore;
