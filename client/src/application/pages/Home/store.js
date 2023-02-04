import { types } from 'mobx-state-tree';
import { create as createHeaderStore, Store as HeaderStore } from 'application/pages/Home/Header/store';
import { create as createSidebarStore, Store as SidebarStore } from 'application/pages/Home/Sidebar/store';
import { create as createStoryStore, Store as StoryStore } from 'application/pages/Home/Stories/store';
import { create as createFeedStore, Store as FeedStore } from 'application/pages/Home/Feeds/store';
import { create as createMessageStore, Store as MassageStore } from 'application/pages/Home/Messages/store';
import { create as createRequestStore, Store as RequestStore } from 'application/pages/Home/Requests/store';
import { create as createProfileStore, Store as ProfileStore } from 'application/pages/Home/Profile/store';
import { create as createSettingsStore, Store as SettingsStore } from 'application/pages/Home/Settings/store';
import { create as createFriendsStore, Store as FriendsStore } from 'application/pages/Home/Friends/store';

export const Store = types
  .model({
    mounted: types.boolean,
    headerStore: HeaderStore,
    sidebarStore: SidebarStore,
    storyStore: StoryStore,
    feedStore: FeedStore,
    requestStore: RequestStore,
    messageStore: MassageStore,
    profileStore: ProfileStore,
    settingsStore: SettingsStore,
    friendsStore: FriendsStore,

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
    headerStore: createHeaderStore(),
    sidebarStore: createSidebarStore(),
    storyStore: createStoryStore(),
    feedStore: createFeedStore(),
    messageStore: createMessageStore(),
    requestStore: createRequestStore(),
    profileStore: createProfileStore(),
    settingsStore: createSettingsStore(),
    friendsStore: createFriendsStore(),
  });
}
