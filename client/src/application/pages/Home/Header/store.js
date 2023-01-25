import { getRoot, types } from 'mobx-state-tree';
import Cookies from 'react-cookie/cjs/Cookies';
import jwt from 'jwt-decode';
import { changeQueryParams } from 'api/utils';

const cookie = new Cookies();
export const Store = types
  .model({
    mounted: types.boolean,
  })
  .views((self) => ({}))

  .actions((self) => ({
    mount: () => {
      self.mounted = true;
    },

    unmount: () => {
      self.mounted = false;
    },

    logout: () => {
      const root = getRoot(self)
      changeQueryParams([], true);
      cookie.remove('token')
      root.init()
    },
  }));

export function create() {
  return Store.create({
    mounted: false,
  });
}
