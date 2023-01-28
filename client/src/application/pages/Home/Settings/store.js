import { flow, getParent, getRoot, getSnapshot, types } from 'mobx-state-tree';
import { FIELDS, LABELS } from './contants';
import Cookies from 'react-cookie/cjs/Cookies';
import jwt from 'jwt-decode';

export const Values = types.model(
  Object.values(FIELDS).reduce((result, item) => ({ ...result, [item]: types.maybeNull(types.string) }), {}),
);

export const Data = types.model({
  values: Values,
});

export const Day = types.model({
  id: types.string,
  title: types.string,
});
export const Month = types.model({
  id: types.string,
  title: types.string,
});
export const Year = types.model({
  id: types.string,
  title: types.string,
});

export const Store = types
  .model({
    mounted: types.boolean,
    data: Data,
    day: types.maybeNull(types.array(Day)),
    month: types.maybeNull(types.array(Month)),
    year: types.maybeNull(types.array(Year)),
  })
  .views((self) => ({
    get values() {
      return getSnapshot(self.data.values);
    },

    get labels() {
      return LABELS.FIELDS;
    },
  }))

  .actions((self) => ({
    mount: () => {
      const parent = getParent(self);
      self.getDate();
      parent.sidebarStore.init();
      self.mounted = true;
    },

    unmount: () => {
      self.mounted = false;
    },
    onChange: ({ id, values }) => {
      self.data.values[id] = values;
      console.log(self.data.values[id]);
    },

    getDate: () => {
      self.day = [];
      self.month = [];
      self.year = [];
      for (let i = 1; i <= 31; i++) {
        const day = { id: `${i}`, title: `${i}` };
        const month = { id: `${i}`, title: `${i}` };
        self.day.push(day);
        if (i <= 12) self.month.push(month);
      }
      for (let i = 1910; i <= 2023; i++) {
        const year = { id: `${i}`, title: `${i}` };
        self.year.unshift(year);
      }
    },

    createSetting: flow(function* createSetting() {
      const root = getRoot(self);
      const cookie = new Cookies();
      const token = cookie.get('token');

      const { id } = jwt(token);
      console.log(id);
      const data = {
        id,
        name: '',
        lastName: '',
        status: '',
        familyStatus: '',
        dateBirthday: '',
        place: '',
        university: '',
      };

      yield root.api.settingsStore.createSetting(data, token);
    }),
  }));

export function create() {
  return Store.create({
    mounted: false,
    data: { values: {} },
    day: null,
    month: null,
    year: null,
  });
}
