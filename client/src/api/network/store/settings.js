import { flow, types } from 'mobx-state-tree';
import requests from '../requests';

export const GetSubjectById = types.model({});

export const Store = types.model({}).actions((self) => ({
  createSetting: flow(function* createSetting(data) {
    try {
      const result = yield requests.createSetting(data);
      console.log(result);
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
