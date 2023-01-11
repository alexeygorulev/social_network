import { flow, getRoot, getSnapshot, types } from 'mobx-state-tree';
import { ERROR_LABELS, FIELDS, LABELS } from './constants';
import Cookies from 'react-cookie/cjs/Cookies';
import jwt from 'jwt-decode';

const cookie = new Cookies();

export const Touched = types.model(
  Object.values(FIELDS).reduce((result, item) => ({ ...result, [item]: types.maybeNull(types.boolean) }), {}),
);

export const Values = types.model(
  Object.values(FIELDS).reduce((result, item) => ({ ...result, [item]: types.maybeNull(types.string) }), {}),
);
export const ErrorLabel = types.model(
  Object.values(FIELDS).reduce((result, item) => ({ ...result, [item]: types.maybeNull(types.string) }), {}),
);

export const Data = types.model({
  touched: Touched,
  values: Values,
  errorLabel: ErrorLabel,
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
    get errorLabels() {
      return Object.values(FIELDS).reduce((result, item) => {
        if (!self.disabled && self.data.touched[item] && self.data.errorLabel[item]) {
          return {
            ...result,
            [item]: self.data.errorLabel[item],
          };
        }
        return result;
      }, {});
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
      self.data = { values: {}, touched: {}, errorLabel: {} };
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
      self.data.values[FIELDS.EMAIL] = null;
      self.data.touched[FIELDS.LOGIN] = false;
      self.data.touched[FIELDS.PASSWORD] = false;
      self.data.touched[FIELDS.EMAIL] = false;
    },
    addNewUser: flow(function* addNewUser() {
      const root = getRoot(self);
      self.data.errorLabel = {};
      try {
        self.disabled = true;
        const data = {
          login: self.data.values[FIELDS.LOGIN],
          password: self.data.values[FIELDS.PASSWORD],
          email: self.data.values[FIELDS.EMAIL],
        };
        self.checkFieldsOnSave();
        const checkByNull = self.checkFillFields(data);
        if (checkByNull) {
          throw new SyntaxError('');
        }
        const result = yield root.api.authorizationStore.addNewUser(data);
        const { token } = result;
        const decoded = jwt(token);
        cookie.set('token', token, {
          expires: new Date(decoded.exp * 1000),
        });
        self.returnToDefault();
      } catch (error) {
        const errorMessage = error.response.data.message;
        if (error.name === 'SyntaxError') root.createNotificationMessage(LABELS.ERROR_FILL_FIELDS);
        if (errorMessage.includes(ERROR_LABELS.ERROR_EMAIL)) self.data.errorLabel[FIELDS.EMAIL] = LABELS.ERROR_EMAIL;
        if (errorMessage.includes(ERROR_LABELS.ERROR_LOGIN_MIN) || errorMessage.includes(ERROR_LABELS.ERROR_LOGIN_MAX))
          self.data.errorLabel[FIELDS.LOGIN] = LABELS.ERROR_LOGIN;
        if (errorMessage.includes(ERROR_LABELS.ERROR_PASSWORD))
          self.data.errorLabel[FIELDS.PASSWORD] = LABELS.ERROR_PASSWORD;
        if (errorMessage.includes(ERROR_LABELS.ERROR_PASSWORD_MAX))
          self.data.errorLabel[FIELDS.PASSWORD] = LABELS.ERROR_PASSWORD_MAX;
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
    data: { values: {}, touched: {}, errorLabel: {} },
    disabled: false,
  });
}
