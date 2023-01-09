import { changeQueryParams } from 'api/utils';
import { types } from 'mobx-state-tree';
import { create as createApiStore, Store as ApiStore } from '../api/network/store';
import { create as createAuthContentStore, Store as AuthContentStore } from 'application/pages/Auth/store';

export const Store = types
  .model({
    mounted: types.boolean,
    api: ApiStore,
    authContent: AuthContentStore,
    newMessage: types.string,
    checkNotification: types.boolean,
  })
  .views((self) => ({}))
  .actions((self) => ({
    mount: () => {
      self.init();
      self.mounted = true;
    },

    unmount: () => {
      self.mounted = false;
    },
    init: () => {
      self.initialized = false;
      changeQueryParams([], true);
      self.initialized = true;
    },
    createNotificationMessage: (message) => {
      self.newMessage = message;
      self.checkNotification = true;
      setTimeout(() => {
        self.removeNotification();
      }, 2000);
    },
    removeNotification: () => {
      self.checkNotification = false;
    },
  }));

export function create() {
  return Store.create({
    mounted: false,
    api: createApiStore(),
    authContent: createAuthContentStore(),
    newMessage: '',
    checkNotification: false,
  });
}
