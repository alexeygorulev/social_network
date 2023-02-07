import { types } from 'mobx-state-tree';
import { create as createApiStore, Store as ApiStore } from '../api/network/store';
import { create as createAuthContentStore, Store as AuthContentStore } from 'application/pages/Auth/store';
import { create as createHomeStore, Store as HomeStore } from 'application/pages/Home/store';
import Cookies from 'react-cookie/cjs/Cookies';

export const Store = types
  .model({
    mounted: types.boolean,
    api: ApiStore,
    authContent: AuthContentStore,
    homeStore: HomeStore,
    newMessage: types.string,
    checkNotification: types.boolean,
    isToken: types.boolean,
    initialized: types.boolean,
    token: types.maybeNull(types.string),
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
      const cookie = new Cookies();
      const token = cookie.get('token');
      self.token = token;
      self.isToken = false;
      if (token) self.isToken = true;
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
    homeStore: createHomeStore(),
    newMessage: '',
    checkNotification: false,
    isToken: false,
    initialized: false,
    token: null,
  });
}
