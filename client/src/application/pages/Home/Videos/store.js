import { Video } from 'api/network/store/videos';
import { changeQueryParams, setQueryParam } from 'api/utils';
import { flow, getParent, getRoot, types } from 'mobx-state-tree';

export const Store = types
  .model({
    mounted: types.boolean,
    initialized: types.boolean,
    videoList: types.maybeNull(types.array(Video)),
    page: types.number,
    limit: types.number,
    fetch: types.boolean,
    filename: types.maybeNull(types.string),
    isAdded: types.boolean,
  })
  .views((self) => ({
    get loading() {
      return self.fetch;
    },
  }))

  .actions((self) => ({
    mount: () => {
      const parent = getParent(self);
      // parent.toggleRightNotification(false);
      self.init();
      self.mounted = true;
    },

    unmount: () => {
      const parent = getParent(self);
      self.videoList = [];
      self.page = 1;
      parent.toggleRightNotification(true);
      changeQueryParams([], true);
      self.filename = null;
      self.mounted = false;
    },

    checkVideoUrl: () => {
      const searchParams = new URLSearchParams(window.location.search).get('video');
      if (searchParams) {
        self.filename = searchParams;
        self.videoFromUrl = true;
      }
    },

    closeVideoFromUrl: () => {
      self.videoFromUrl = false;
    },

    init: flow(function* init(isMyVideos) {
      self.initialized = false;
      try {
        const root = getRoot(self);
        self.checkVideoUrl();

        const params = {
          page: 1,
          limit: self.limit,
        };
        let result;
        if (!isMyVideos) {
          result = yield root.api.videosStore.getAllVideos(params);
        } else {
          result = yield root.api.videosStore.getAllUserVideos(params);
          
        }
        self.videoList = result.map((item) => ({
          ...item,
          isLoaded: false,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        self.initialized = true;
      }
    }),

    checkIsLoaded: (id) => {
      self.videoList = self.videoList.map((item) =>
        item.id === id
          ? {
              ...item,
              isLoaded: true,
            }
          : item,
      );
    },
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

    createVideo: flow(function* createVideo(data, changeProgressFileById, index) {
      const root = getRoot(self);
      try {
        yield root.api.videosStore.createVideo(data, changeProgressFileById, index);
      } catch (e) {
        console.log(e);
      } finally {
      }
    }),
    addVideoById: flow(function* addVideoById(filename) {
      const root = getRoot(self);
      const video = self.videoList.find((item) => item.filename === filename);
      yield root.api.videosStore.addVideoById(video);
      yield self.checkOnAddedVideo(filename);
    }),

    isMyVideos: flow(function* isMyVideos() {
      self.init(true);
    }),

    checkOnAddedVideo: flow(function* checkOnAddedVideo(filename) {
      const root = getRoot(self);
      const video = self.videoList.find((item) => item.filename === filename);
      const result = yield root.api.videosStore.checkOnAddedVideo(video);
      self.isAdded = result.data;
    }),

    onClickVideo: (id) => {
      const { filename } = self.videoList.find((item) => item.id === id);
      self.filename = filename;
      setQueryParam('video', `${filename}`);
    },

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
    filename: null,
    isAdded: false,
  });
}
