import { Friend } from 'api/network/store/friends';
import { flow, getRoot, getSnapshot, types } from 'mobx-state-tree';

export const Store = types
  .model({
    mounted: types.boolean,
    initialized: types.boolean,
    users: types.maybeNull(types.array(Friend)),
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
    init: flow(function* init() {
      self.initialized = false;
      const root = getRoot(self);
      const result = yield root.api.friendsStore.getFriendsAcceptList();
      self.users = result.data || [];
      self.initialized = true;
    }),
    acceptFriend: flow(function* acceptFriend(id) {
      try {
        const root = getRoot(self);
        const data = {
          acceptUserId: id,
        };
        yield root.api.friendsStore.acceptFriend(data);
        self.init();
      } catch (error) {}
    }),
    declineRequestFriend: flow(function* declineRequestFriend(id) {
      try {
        const root = getRoot(self);
        const data = {
          requestId: id,
        };
        yield root.api.friendsStore.declineRequestFriend(data);
        self.init();
      } catch (error) {}
    }),
  }));

export function create() {
  return Store.create({
    mounted: false,
    initialized: false,
    users: null,
  });
}
