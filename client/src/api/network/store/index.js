import { types } from 'mobx-state-tree';

import { create as createAuthStore, Store as AuthStore } from './auth';
import { create as createSettingsStore, Store as SettingsStore } from './settings';
import { create as createUserProfileStore, Store as UserProfileStore } from './profile';
import { create as createFriendsStore, Store as FriendsStore } from './friends';

export const Store = types.model({
  authorizationStore: AuthStore,
  settingsStore: SettingsStore,
  userProfileStore: UserProfileStore,
  friendsStore: FriendsStore,
});

export function create() {
  return Store.create({
    authorizationStore: createAuthStore(),
    settingsStore: createSettingsStore(),
    userProfileStore: createUserProfileStore(),
    friendsStore: createFriendsStore(),
  });
}
