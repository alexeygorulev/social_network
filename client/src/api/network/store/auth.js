import { flow, types } from 'mobx-state-tree';
import requests from '../requests';

export const GetSubjectById = types.model({});

export const Store = types.model({}).actions((self) => ({
  checkLogin: flow(function* checkLogin(data) {
    try {
      const result = yield requests.checkLogin(data);
      return result.data;
    } catch (error) {
      throw error;
    }
  }),
  addNewUser: flow(function* addNewUser(data) {
    try {
      const result = yield requests.addUser(data);
      return result.data;
    } catch (error) {
      throw error;
    }
  }),
}));

export function create() {
  return Store.create({
    getSubjectById: null,
  });
}
