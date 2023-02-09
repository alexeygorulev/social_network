import { flow, types } from 'mobx-state-tree';
import requests from '../requests';

export const UserSettings = types.model({
  dateBirthday: types.maybeNull(types.string),
  familyStatus: types.maybeNull(types.string),
  id: types.maybeNull(types.number),
  lastName: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  place: types.maybeNull(types.string),
  role: types.maybeNull(types.string),
  status: types.maybeNull(types.string),
  university: types.maybeNull(types.string),
});
export const UserProfile = types.model({
  ban: types.boolean,
  email: types.maybeNull(types.string),
  login: types.maybeNull(types.string),
  avatarId: types.maybeNull(types.number),
  id: types.maybeNull(types.string),
  settings: types.maybeNull(types.array(UserSettings)),
});

export const Store = types
  .model({
    data: types.model({
      getProfile: types.model({ fetch: types.boolean, response: types.maybeNull(UserProfile) }),
    }),
  })
  .actions((self) => ({
    getUserProfile: flow(function* getUserProfile() {
      try {
        self.data.getProfile.fetch = true;
        const result = yield requests.getProfile();
        const response = (result && result.data) || [];
        self.data.getProfile.response = response;
        self.data.getProfile.fetch = false;
        return response;
      } catch (error) {
        throw error;
      }
    }),
    getFriendProfile: flow(function* getFriendProfile(id) {
      try {
        self.data.getProfile.fetch = true;
        const result = yield requests.getFriendProfile(id);
        const response = (result && result.data) || [];
        self.data.getProfile.response = response;
        self.data.getProfile.fetch = false;
        return response;
      } catch (error) {
        throw error;
      }
    }),
    createAvatar: flow(function* createAvatar(data) {
      try {
        self.data.getProfile.fetch = true;
        const result = yield requests.createAvatar(data);
        self.data.getProfile.fetch = false;
        return result;
      } catch (error) {
        throw error;
      }
    }),
  }));

export function create() {
  return Store.create({
    data: { getProfile: { fetch: false, response: null } },
  });
}
