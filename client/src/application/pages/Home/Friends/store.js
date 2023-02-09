import { Friend } from 'api/network/store/friends';
import { setQueryParam } from 'api/utils';
import { flow, getParent, getRoot, getSnapshot, types } from 'mobx-state-tree';
import { STEPS } from './constants';

export const Store = types
  .model({
    mounted: types.boolean,
    initialized: types.boolean,
    friends: types.maybeNull(types.array(Friend)),
    users: types.maybeNull(types.array(Friend)),
    step: types.maybeNull(types.enumeration(Object.values(STEPS))),
    isUsers: types.boolean,
    counterFriends: types.number,
    requestFriends: types.maybeNull(types.array(types.string)),
    id: types.maybeNull(types.string),
    idProfile: types.maybeNull(types.string),
  })
  .views((self) => ({
    get visibility() {
      return {
        friendsList: self.step === STEPS.FRIENDS_LIST,
        allUsers: self.step === STEPS.ALL_USERS,
      };
    },
  }))

  .actions((self) => ({
    mount: () => {
      const parent = getParent(self);
      parent.profileStore.isMyProfile ? self.init() : self.getFriends();
      self.step = STEPS.FRIENDS_LIST;
      self.mounted = true;
    },

    unmount: () => {
      self.mounted = false;
      self.idProfile = null;
    },
    setIdFriend: (id) => {
      self.id = id;
    },
    getFriends: flow(function* getFriends() {
      const root = getRoot(self);
      if (self.id) setQueryParam('id', self.id, true);
      const paramsId = window.location.search;
      const friendList = yield root.api.friendsStore.getFriends(paramsId);
      self.friends = friendList || [];
      self.counterFriends = self.friends.length;
    }),
    getProfileFriend: flow(function* (id) {
      const parent = getParent(self);
      parent.profileStore.toggleOnFriendProfile();
      parent.profileStore.setIdFriend(id);
      yield parent.profileStore.init();
    }),

    init: flow(function* init() {
      const root = getRoot(self);
      try {
        self.initialized = false;
        if (window.location.search !== '') return self.getFriends();
        const result = yield root.api.friendsStore.getFriendsList();
        self.friends = result || [];
        self.counterFriends = self.friends.length;
      } catch (error) {
        console.log(error);
      } finally {
        self.initialized = true;
      }
    }),
    setIdProfile: (id) => {
      self.idProfile = id;
    },
    createFriendRequest: flow(function* (id) {
      self.initialized = false;
      try {
        const root = getRoot(self);
        const data = {
          acceptUserId: id,
        };
        yield root.api.friendsStore.createFriendRequest(data);
        yield self.getUsers();
      } catch (error) {
        console.log(error);
      } finally {
        self.initialized = true;
      }
    }),
    getUsers: flow(function* getUsers() {
      const root = getRoot(self);
      try {
        const result = yield root.api.friendsStore.getAllUsers();
        const friendsRequests = yield root.api.friendsStore.getFriendsRequests();
        self.friendsRequests = friendsRequests.data || [];
        self.users = result || [];
      } catch (error) {
        console.log(error);
      }
    }),
    stepFriendsList: flow(function* stepFriendsList() {
      self.initialized = false;
      self.isUsers = false;
      self.mount();
      self.step = STEPS.FRIENDS_LIST;
      self.initialized = true;
    }),
    stepUsersList: flow(function* stepFriendsList() {
      self.initialized = false;
      self.step = STEPS.ALL_USERS;
      self.isUsers = true;
      yield self.getUsers();
      self.initialized = true;
    }),
  }));

export function create() {
  return Store.create({
    mounted: false,
    initialized: false,
    friends: null,
    step: STEPS.FRIENDS_LIST,
    isUsers: false,
    counterFriends: 0,
    requestFriends: null,
    users: null,
    idProfile: null,
  });
}
