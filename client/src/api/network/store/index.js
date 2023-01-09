import { types } from 'mobx-state-tree';

import { create as createAuthStore, Store as AuthStore } from './auth';

export const Store = types.model({
  authorizationStore: AuthStore,
});

export function create() {
  return Store.create({
    authorizationStore: createAuthStore(),
  });
}
