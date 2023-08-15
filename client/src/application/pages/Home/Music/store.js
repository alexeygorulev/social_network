import { flow, getRoot, types } from 'mobx-state-tree';

export const Store = types
  .model({
    mounted: types.boolean,
    file: types.maybeNull(types.frozen()),
  })
  .views((self) => ({}))

  .actions((self) => ({
    mount: () => {
      self.mounted = true;
    },

    unmount: () => {
      self.mounted = false;
    },
    kek: flow(function* kek() {
      const root = getRoot(self);
      try {
        const result = yield root.api.videosStore.kek();
        self.file = new File([result.data], 'video')
      } catch (e) {
        console.log(e);
      }
    }),
  }));

export function create() {
  return Store.create({
    mounted: false,
    file: null,
  });
}
