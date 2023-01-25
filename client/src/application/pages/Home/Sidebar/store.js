import { types } from 'mobx-state-tree';
import { LIST_ITEMS } from './constants';

export const SidebarItems = types.model({
  title: types.maybeNull(types.string),
  icons: types.maybeNull(types.string),
  countsClass: types.maybeNull(types.string),
  counts: types.maybeNull(types.string),
  isActive: types.boolean,
  url: types.string,
});

export const Store = types
  .model({
    mounted: types.boolean,
    sidebarItems: types.array(SidebarItems),
  })
  .views((self) => ({
    get listItems() {
      return self.sidebarItems;
    },
  }))

  .actions((self) => ({
    mount: () => {
      self.init();
      self.mounted = true;
    },

    unmount: () => {
      self.mounted = false;
    },
    initActiveSidebar: () => {
      self.sidebarItems.forEach(item => item.isActive = false)
      if(document.location.pathname === '/') self.sidebarItems[2].isActive = true
      self.sidebarItems = self.sidebarItems.map((item) =>
        document.location.pathname === item.url
          ? {
              ...item,
              isActive: true,
            }
          : item,
      );
    },
    init: () => {
      self.initActiveSidebar()
    },
    changeClassOnActive: (title) => {
      self.sidebarItems.forEach((item) => (item.isActive = false));
      self.sidebarItems.forEach((item) => (item.title === title ? (item.isActive = true) : false));
    },
  }));

export function create() {
  return Store.create({
    mounted: false,
    sidebarItems: LIST_ITEMS,
  });
}
