import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class UserStore {
  userInfo = {
    username: "",
    apps: [],
    appId: "",
    avatar: "",
    userId: 0,
    isAuthPhone: false,
    identityType: 0,
    contentTrack: 0,
    realNameAuthed: false,
    accountId: null,
    accountInfo: null,
  };
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "user",
      properties: ["userInfo"],
      storage: localStorage,
    });
  }
  setUserInfo(info) {
    this.userInfo = info;
  }

  setAuthApps(apps) {
    this.userInfo.apps = apps;
  }

  setAppId(id) {
    this.userInfo.appId = id;
  }

  setAvatar(src) {
    this.userInfo.avatar = src;
  }

  setAccountInfo(id, item = {}) {
    this.userInfo.accountId = id;
    this.userInfo.accountInfo = item;
  }

  setIdentityType(id) {
    this.userInfo.identityType = id;
  }

  setContentTrack(id) {
    this.userInfo.contentTrack = id;
  }
  setIsAuthPhone(val) {
    this.userInfo.isAuthPhone = val;
  }

  clearUserInfo() {
    this.userInfo = {
      username: "",
      identityType: 0,
      apps: [],
      appId: "",
      avatar: "",
      userId: 0,
      isAuthPhone: false,
      accountId: null,
      accountInfo: {},
    };
  }
}

export default UserStore;
