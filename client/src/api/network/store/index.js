import { types } from 'mobx-state-tree';

import { create as createAuthStore, Store as AuthStore } from './auth';
import { create as createSettingsStore, Store as SettingsStore } from './settings';

export const Store = types.model({
  authorizationStore: AuthStore,
  settingsStore: SettingsStore,
});

export function create() {
  return Store.create({
    authorizationStore: createAuthStore(),
    settingsStore: createSettingsStore(),
  });
}
