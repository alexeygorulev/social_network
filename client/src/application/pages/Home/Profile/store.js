import { UserSettings } from 'api/network/store/profile';
import { flow, getRoot, getSnapshot, types } from 'mobx-state-tree';

export const Data = types.model({});

export const Store = types
  .model({
    mounted: types.boolean,
    initialized: types.boolean,
    settings: types.maybeNull(UserSettings),
    defaultName: types.maybeNull(types.string)
  })
  .views((self) => ({
    get profileData() {
      return self.settings;
    },
  }))

  .actions((self) => ({
    mount: () => {
      self.init();
      self.mounted = true;
    },

    unmount: () => {
      self.settings = null
      self.defaultName = null
      self.mounted = false;

    },
    init: flow(function* init() {
      const root = getRoot(self);
      self.initialized = false;
      try {
        const result = yield root.api.userProfileStore.getUserProfile();
        const { setting, ...rest } = result;
        self.defaultName = rest.login
        self.settings = setting[0]
      } catch (error) {
        console.log(error);
      } finally {
        self.initialized = true;
      }
    }),
  }));

export function create() {
  return Store.create({
    mounted: false,
    initialized: false,
    settings: null,
    defaultName: null,
  });
}
