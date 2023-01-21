import { types } from 'mobx-state-tree';

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
  }));

export function create() {
  return Store.create({
    mounted: false,
  });
}
