import { types } from "mobx-state-tree";
import { create as createLoginStore, Store as LoginStore } from './LogIn/store';
import { create as createSignUpStore, Store as SignUpStore } from './SignUp/store';


export const Store = types
  .model({
    mounted: types.boolean,
    loginStore: LoginStore,
    signUpStore: SignUpStore,
    onLogin: types.boolean
  })

  .actions((self) => ({
    mount: () => {
      self.mounted = true;
    },

    unmount: () => {
      self.mounted = false;
    },
    changeForm: () => {
      self.onLogin = !self.onLogin
    }
  }));

export function create() {
  return Store.create({
    mounted: false,
    onLogin: true,
    loginStore: createLoginStore(),
    signUpStore: createSignUpStore(),
  });
}
