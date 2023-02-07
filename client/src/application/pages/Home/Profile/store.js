import { Friend } from 'api/network/store/friends';
import { UserSettings } from 'api/network/store/profile';
import { setQueryParam } from 'api/utils';
import { flow, getParent, getRoot, types } from 'mobx-state-tree';

export const Data = types.model({});

export const Store = types
  .model({
    mounted: types.boolean,
    initialized: types.boolean,
    settings: types.maybeNull(UserSettings),
    defaultName: types.maybeNull(types.string),
    friends: types.maybeNull(types.array(Friend)),
    isMyProfile: types.boolean,
    idProfile: types.maybeNull(types.string),
  })
  .views((self) => ({
    get profileData() {
      return self.settings;
    },
  }))

  .actions((self) => ({
    mount: () => {
      self.init();
      self.mounted = true;
    },

    unmount: () => {
      self.settings = null;
      self.defaultName = null;
      self.mounted = false;
    },
    getFriendProfileByUrl: flow(function* getFriendProfileByUrl() {
      try {
        self.initialized = false;
        const root = getRoot(self);
        const paramsId = window.location.search;
        const result = yield root.api.userProfileStore.getFriendProfile(paramsId);
        const { setting, ...rest } = result;
        self.idProfile = rest.id;
        self.defaultName = rest.login;
        self.settings = setting[0];
        self.initialized = true;
      } catch (error) {
        console.log(error);
      }
    }),
    init: flow(function* init() {
      self.initialized = false;
      const root = getRoot(self);
      try {
        if (window.location.search !== '') {
          const paramsId = window.location.search;
          const friendList = yield root.api.friendsStore.getFriends(paramsId);
          self.friends = friendList || [];
          return self.getFriendProfileByUrl();
        }
        const result = yield root.api.userProfileStore.getUserProfile();
        const friendList = yield root.api.friendsStore.getFriendsList();
        self.friends = friendList || [];
        const { setting, ...rest } = result;
        self.defaultName = rest.login;
        self.settings = setting[0];
      } catch (error) {
        console.log(error);
      } finally {
        self.initialized = true;
      }
    }),
    uploadFriends: flow(function* uploadFriends() {
      const root = getRoot(self);
      try {
        const friendList = yield root.api.friendsStore.getFriendsList();
        self.friends = friendList || [];
      } catch (error) {
        console.log(error);
      }
    }),
    getListFriend: () => {
      const parent = getParent(self);
      self.isMyProfile = false;
      parent.friendsStore.setIdFriend(self.idProfile);
    },
    toggleOnMyProfile: () => {
      self.isMyProfile = true
    },
    getFriendProfile: flow(function* getFriendProfile(id) {
      self.initialized = false;
      const root = getRoot(self);
      try {
        setQueryParam('id', id, true);
        const paramsId = window.location.search;
        const result = yield root.api.userProfileStore.getFriendProfile(paramsId);
        const { setting, ...rest } = result;
        self.idProfile = rest.id;
        self.defaultName = rest.login;
        self.settings = setting[0];
        const friendList = yield root.api.friendsStore.getFriends(paramsId);
        self.friends = friendList || [];
        self.initialized = true;
      } catch (error) {
        console.log(error);
      } finally {
      }
    }),
  }));

export function create() {
  return Store.create({
    mounted: false,
    initialized: false,
    settings: null,
    defaultName: null,
    friends: null,
    isMyProfile: true,
    idProfile: null,
  });
}
