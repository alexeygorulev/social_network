import { flow, types } from 'mobx-state-tree';
import requests from '../requests';

export const FriendsSettings = types.model({
  id: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  lastName: types.maybeNull(types.string),
  status: types.maybeNull(types.string),
  familyStatus: types.maybeNull(types.string),
  dateBirthday: types.maybeNull(types.string),
  place: types.maybeNull(types.string),
  university: types.maybeNull(types.string),
});

export const Friend = types.model({
  id: types.maybeNull(types.string),
  login: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  ban: types.maybeNull(types.boolean),
  role: types.maybeNull(types.string),
  setting: types.maybeNull(types.array(FriendsSettings)),
});

// export const Friends = types.model({
//   friends: types.maybeNull(types.array(Friend)),
// });

export const Store = types
  .model({
    data: types.model({
      getFriends: types.model({ fetch: types.boolean, response: types.maybeNull(types.array(Friend)) }),
    }),
  })
  .actions((self) => ({
    getFriendsList: flow(function* getFriendsList() {
      try {
        self.data.getFriends.fetch = true;
        const result = yield requests.getFriends();
        const response = (result && result.data) || [];
        self.data.getFriends.response = response;
        self.data.getFriends.fetch = false;
        return response;
      } catch (error) {
        throw error;
      }
    }),
    getAllUsers: flow(function* getAllUsers() {
      try {
        self.data.getFriends.fetch = true;
        const result = yield requests.getUsers();
        const response = (result && result.data) || [];
        self.data.getFriends.response = response;
        self.data.getFriends.fetch = false;
        return response;
      } catch (error) {
        throw error;
      }
    }),
    getFriendsRequests: flow(function* getFriendsRequests() {
      try {
        const result = yield requests.getFriendsRequests();
        return result;
      } catch (error) {
        throw error;
      }
    }),
    getFriendsAcceptList: flow(function* getFriendsAcceptList() {
      try {
        const result = yield requests.getFriendsAcceptList();
        return result;
      } catch (error) {
        throw error;
      }
    }),
    createFriendRequest: flow(function* createFriendRequest(data) {
      try {
        self.data.getFriends.fetch = true;
        const result = yield requests.createFriendRequest(data);
        self.data.getFriends.fetch = false;
        return result;
      } catch (error) {
        throw error;
      }
    }),
    acceptFriend: flow(function* acceptFriend(data) {
      try {
        self.data.getFriends.fetch = true;
        const result = yield requests.acceptFriend(data);
        console.log(result);
        self.data.getFriends.fetch = false;
        return result;
      } catch (error) {
        throw error;
      }
    }),
    declineRequestFriend: flow(function* declineRequestFriend(data) {
      try {
        self.data.getFriends.fetch = true;
        const result = yield requests.declineRequestFriend(data);
        self.data.getFriends.fetch = false;
        return result;
      } catch (error) {
        throw error;
      }
    }),
  }));

export function create() {
  return Store.create({
    data: { getFriends: { fetch: false, response: null } },
  });
}
