import { Friend } from 'api/network/store/friends';
import { UserSettings } from 'api/network/store/profile';
import { changeQueryParams, setQueryParam } from 'api/utils';
import { flow, getParent, getRoot, types } from 'mobx-state-tree';
import { checkByMyselfProfile } from './utils';

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
    isUploadPhoto: types.boolean,
    avatarId: types.maybeNull(types.number),
    id: types.maybeNull(types.string),
  })
  .views((self) => ({
    get profileData() {
      return self.settings;
    },
  }))

  .actions((self) => ({
    mount: () => {
      if (!self.isMyProfile) setQueryParam('id', self.id, true);
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
        self.isMyProfile = false;
        const root = getRoot(self);
        const paramsId = window.location.search;
        const result = yield root.api.userProfileStore.getFriendProfile(paramsId);
        const { setting, ...rest } = result;
        self.idProfile = rest.id;
        self.defaultName = rest.login;
        self.avatarId = rest.avatarId;
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
        const paramsId = window.location.search;
        if (checkByMyselfProfile(paramsId)) {
          changeQueryParams([], true);
          self.isMyProfile = true;
        }
        if (window.location.search !== '') {
          const friendList = yield root.api.friendsStore.getFriends(paramsId);
          self.friends = friendList || [];
          return self.getFriendProfileByUrl();
        }
        const result = yield root.api.userProfileStore.getUserProfile();
        const friendList = yield root.api.friendsStore.getFriendsList();
        self.friends = friendList || [];
        self.isMyProfile = true;
        const { setting, ...rest } = result;
        self.defaultName = rest.login;
        self.settings = setting[0];
        self.avatarId = rest.avatarId;
      } catch (error) {
        if (error.message === 'Request failed with status code 403') root.failedToken();
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
    setIdFriend: (id) => {
      self.id = id;
    },
    getListFriend: () => {
      const parent = getParent(self);
      self.isMyProfile = false;
      parent.friendsStore.setIdFriend(self.idProfile);
    },
    toggleOnMyProfile: () => {
      self.isMyProfile = true;
    },
    toggleOnFriendProfile: () => {
      self.isMyProfile = false;
    },
    createAvatar: flow(function* createAvatar(data) {
      const root = getRoot(self);
      try {
        yield root.api.userProfileStore.createAvatar(data);
        changeQueryParams([], true);
        yield self.init();
      } catch (error) {
        console.log(error);
      }
    }),
    toggleUpload: () => {
      self.isUploadPhoto = !self.isUploadPhoto;
    },
    getFriendProfile: flow(function* getFriendProfile(id) {
      self.initialized = false;
      self.isMyProfile = false;
      const root = getRoot(self);
      try {
        setQueryParam('id', id, true);
        const paramsId = window.location.search;
        if (checkByMyselfProfile(paramsId)) {
          changeQueryParams([], true);
          self.isMyProfile = true;
        }
        const result = yield root.api.userProfileStore.getFriendProfile(paramsId);
        const { setting, ...rest } = result;
        self.idProfile = rest.id;
        self.defaultName = rest.login;
        self.avatarId = rest.avatarId;
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
    isUploadPhoto: false,
    avatarId: null,
    id: null,
  });
}
