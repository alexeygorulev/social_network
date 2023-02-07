import { Friend } from 'api/network/store/friends';
import { flow, getRoot, getSnapshot, types } from 'mobx-state-tree';
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
      self.init();
      self.mounted = true;
    },

    unmount: () => {
      self.mounted = false;
    },
    init: flow(function* init() {
      const root = getRoot(self);
      try {
        self.initialized = false;
        const result = yield root.api.friendsStore.getFriendsList();
        self.friends = result || [];
        self.counterFriends = self.friends.length;
      } catch (error) {
        console.log(error);
      } finally {
        self.initialized = true;
      }
    }),
    createFriendRequest: flow(function* (id) {
      self.initialized = false;
      try {
        const root = getRoot(self);
        const data = {
          acceptUserId: id,
        };
        yield root.api.friendsStore.createFriendRequest(data);
        self.getUsers();
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
      yield self.init();
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
  });
}
