import { flow, getRoot, getSnapshot, types } from 'mobx-state-tree';
import { FIELDS, LABELS } from './constants';
import Cookies from 'react-cookie/cjs/Cookies';
import jwt from 'jwt-decode';

const cookie = new Cookies();

export const Touched = types.model(
  Object.values(FIELDS).reduce((result, item) => ({ ...result, [item]: types.maybeNull(types.boolean) }), {}),
);

export const Values = types.model(
  Object.values(FIELDS).reduce((result, item) => ({ ...result, [item]: types.maybeNull(types.string) }), {}),
);

export const Data = types.model({
  touched: Touched,
  values: Values,
});
export const Store = types
  .model({
    mounted: types.boolean,
    data: Data,
    disabled: types.boolean,
  })
  .views((self) => ({
    get values() {
      return getSnapshot(self.data.values);
    },
    get errors() {
      return Object.values(FIELDS).reduce((result, item) => {
        if (!self.disabled && self.data.touched[item]) {
          return {
            ...result,
            [item]: self.data.values[item],
          };
        }
        return result;
      }, {});
    },
  }))

  .actions((self) => ({
    mount: () => {
      self.mounted = true;
    },

    unmount: () => {
      self.mounted = false;
      self.data = { values: {}, touched: {} };
    },
    checkFieldsOnSave: () => {
      Object.values(FIELDS).forEach((item) => (self.data.touched[item] = true));
    },
    checkFillFields: (data) => {
      const checkFieldByNull = Object.values(data).filter((item) => item == null);
      const fillFields = checkFieldByNull.length > 0;
      return fillFields;
    },
    returnToDefault: () => {
      self.data.values[FIELDS.LOGIN] = null;
      self.data.values[FIELDS.PASSWORD] = null;
      self.data.touched[FIELDS.LOGIN] = false;
      self.data.touched[FIELDS.PASSWORD] = false;
    },
    checkLogin: flow(function* checkLogin() {
      const root = getRoot(self);
      try {
        self.disabled = true;
        const data = {
          login: self.data.values[FIELDS.LOGIN],
          password: self.data.values[FIELDS.PASSWORD],
        };
        self.checkFieldsOnSave();
        const checkByNull = self.checkFillFields(data);
        if (checkByNull) {
          throw new SyntaxError('');
        }
        const result = yield root.api.authorizationStore.checkLogin(data);
        const { token } = result;
        const decoded = jwt(token);
        cookie.set('token', token, {
          expires: new Date(decoded.exp * 20000),
        });
        self.returnToDefault();
      } catch (error) {
        if (error.name === 'SyntaxError') root.createNotificationMessage(LABELS.ERROR_FILL_FIELDS);
        if (error.code === 'ERR_BAD_REQUEST') root.createNotificationMessage(LABELS.ERROR_BAD_REQUEST);
      } finally {
        self.disabled = false;
      }
    }),
    onChange: ({ id, value }) => {
      self.data.values[id] = value;
    },
    onFocus: () => {},

    onBlur: ({ id }) => {
      self.data.touched[id] = true;
    },
  }));

export function create() {
  return Store.create({
    mounted: false,
    data: { values: {}, touched: {} },
    disabled: false,
  });
}
