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
    id: types.maybeNull(types.string),
    initialized: types.boolean,
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
      self.init();
      self.mounted = true;
    },

    unmount: () => {
      self.mounted = false;
    },
    onChange: ({ id, values }) => {
      self.data.values[id] = values;
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
    init: flow(function* init() {
      self.initialized = false;
      const root = getRoot(self);
      const cookie = new Cookies();
      const token = cookie.get('token');

      const { id } = jwt(token);
      self.id = id;
      const { data } = yield root.api.settingsStore.getSetting(self.id);
      self.fillFields(data);
      self.initialized = true;
    }),
    fillFields: (data) => {
      const { dateBirthday } = data;
      if (dateBirthday) {
        const dateNumber = dateBirthday.split('.');
        const day = dateNumber[0];
        const month = dateNumber[1];
        const year = dateNumber[2];
        self.data.values[FIELDS.DAY] = day;
        self.data.values[FIELDS.MONTH] = month;
        self.data.values[FIELDS.YEAR] = year;
      }
      self.data.values[FIELDS.NAME] = data.name;
      self.data.values[FIELDS.LAST_NAME] = data.lastName;
      self.data.values[FIELDS.STATUS] = data.status;
      self.data.values[FIELDS.FAMILY_STATUS] = data.familyStatus;
      self.data.values[FIELDS.CITY] = data.place;
      self.data.values[FIELDS.UNIVERSITY] = data.university;
      self.data.values[FIELDS.ROLE] = self.formatRole(data.role);
    },

    formatRole: (role) => {
      switch (role) {
        case 'admin':
          return 'Админ';
        default:
          break;
      }
    },
    createSetting: flow(function* createSetting() {
      const root = getRoot(self);

      const day = self.data.values[FIELDS.DAY] < 10 ? `0${self.data.values[FIELDS.DAY]}` : self.data.values[FIELDS.DAY];
      const month =
        self.data.values[FIELDS.MONTH] < 10 ? `0${self.data.values[FIELDS.DAY]}` : self.data.values[FIELDS.DAY];
      const year = self.data.values[FIELDS.YEAR];
      const dateBirthday = `${day}.${month}.${year}`;

      const data = {
        id: self.id,
        name: self.data.values[FIELDS.NAME],
        lastName: self.data.values[FIELDS.LAST_NAME],
        status: self.data.values[FIELDS.STATUS],
        familyStatus: self.data.values[FIELDS.FAMILY_STATUS],
        dateBirthday,
        place: self.data.values[FIELDS.CITY],
        university: self.data.values[FIELDS.UNIVERSITY],
        role: self.data.values[FIELDS.ROLE],
      };
      yield root.api.settingsStore.createSetting(data);
    }),
  }));

export function create() {
  return Store.create({
    mounted: false,
    data: { values: {} },
    day: null,
    month: null,
    year: null,
    id: null,
    initialized: false,
  });
}
