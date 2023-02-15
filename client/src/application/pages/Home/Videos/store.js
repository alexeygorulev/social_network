import { Video } from 'api/network/store/videos';
import { flow, getParent, getRoot, types } from 'mobx-state-tree';

export const Store = types
  .model({
    mounted: types.boolean,
    initialized: types.boolean,
    videoList: types.maybeNull(types.array(Video)),
    page: types.number,
    limit: types.number,
    fetch: types.boolean,
  })
  .views((self) => ({
    get loading() {
      return self.fetch;
    },
  }))

  .actions((self) => ({
    mount: () => {
      const parent = getParent(self);
      parent.toggleRightNotification(false);
      self.init();
      self.mounted = true;
    },

    unmount: () => {
      const parent = getParent(self);
      self.videoList = [];
      self.page = 1;
      parent.toggleRightNotification(true);
      self.mounted = false;
    },

    init: flow(function* init() {
      self.initialized = false;
      try {
        const root = getRoot(self);
        const params = {
          page: 1,
          limit: self.limit,
        };
        const result = yield root.api.videosStore.getAllVideos(params);
        self.videoList = result;
      } catch (error) {
        console.log(error);
      } finally {
        self.initialized = true;
      }
    }),

    getNextPage: flow(function* getNextPage() {
      const root = getRoot(self);
      const { next } = root.api.videosStore;
      if (next === '') return;
      const params = {
        page: ++self.page,
        limit: self.limit,
      };
      try {
        self.fetch = true;
        const result = yield root.api.videosStore.getAllVideos(params);
        self.videoList = [...self.videoList, ...result];
      } catch (e) {
        console.log(e);
      } finally {
        self.fetch = false;
      }
    }),

    createVideo: flow(function* createVideo(data) {
      const root = getRoot(self);
      try {
        const result = yield root.api.videosStore.createVideo(data);
        console.log(result);
      } catch (e) {
        console.log(e);
      } finally {
      }
    }),

    onLoadMore: () => {
      self.getNextPage();
    },
  }));

export function create() {
  return Store.create({
    mounted: false,
    initialized: false,
    videoList: null,
    page: 1,
    limit: 12,
    fetch: false,
  });
}
