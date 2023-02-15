import { types, getParent } from 'mobx-state-tree';

export const Store = types
  .model({
    mounted: types.boolean,
  })

  .actions((self) => ({
    mount: () => {
      self.mounted = true;
    },

    unmount: () => {
      self.mounted = false;
    },

    handleLoad: () => {
      const parent = getParent(self);
      if (parent.videoStore.fetch) return;
      parent.videoStore.onLoadMore();
    },
  }));

export function create() {
  return Store.create({
    mounted: false,
  });
}
