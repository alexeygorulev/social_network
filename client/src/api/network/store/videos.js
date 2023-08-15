import { flow, types } from 'mobx-state-tree';
import requests from '../requests';

export const Video = types.model({
  id: types.maybeNull(types.number),
  videoName: types.maybeNull(types.string),
  filename: types.maybeNull(types.string),
  isLoaded: types.maybeNull(types.boolean),
});

export const Store = types
  .model({
    data: types.model({
      getVideos: types.model({ fetch: types.boolean, response: types.maybeNull(types.array(Video)) }),
    }),
    next: types.maybeNull(types.string),
  })
  .actions((self) => ({
    getAllVideos: flow(function* getAllVideos(data) {
      try {
        self.data.getVideos.fetch = true;
        const result = yield requests.getAllVideos(data);
        const response = (result && result.data.items) || [];
        self.next = result.data.links.next || '';
        self.data.getVideos.response = response;
        self.data.getVideos.fetch = false;
        return response;
      } catch (error) {
        throw error;
      }
    }),
    
    getAllUserVideos: flow(function* getAllUserVideos(data) {
      try {
        self.data.getVideos.fetch = true;
        const result = yield requests.getAllUserVideos(data);
        const response = (result && result.data.items) || [];
        self.next = result.data.links.next || '';
        self.data.getVideos.response = response;
        self.data.getVideos.fetch = false;
        return response;
      } catch (error) {
        throw error;
      }
    }),

    createVideo: flow(function* createVideo(data, changeProgressFileById, index) {
      try {
        self.data.getVideos.fetch = true;
        const result = yield requests.createVideo(data, changeProgressFileById, index);
        self.data.getVideos.fetch = false;
        return result;
      } catch (error) {
        throw error;
      }
    }),
    addVideoById: flow(function* addVideoById(data) {
      try {
        self.data.getVideos.fetch = true;
        const result = yield requests.addVideoById(data);
        self.data.getVideos.fetch = false;
        return result;
      } catch (error) {
        throw error;
      }
    }),
    checkOnAddedVideo: flow(function* checkOnAddedVideo(data) {
      try {
        self.data.getVideos.fetch = true;
        const result = yield requests.checkOnAddedVideo(data);
        self.data.getVideos.fetch = false;
        return result;
      } catch (error) {
        throw error;
      }
    }),
  }));

export function create() {
  return Store.create({
    data: { getVideos: { fetch: false, response: null } },
    next: null,
  });
}
