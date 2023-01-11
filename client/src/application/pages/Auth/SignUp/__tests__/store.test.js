import { create } from '../../store';

describe('src/pages/SignUp', () => {
  let rootStore;

  beforeEach(() => {
    rootStore = create();
  });
  it('testing mount', () => {
    const { signUpStore: store } = rootStore;
    store.mount();
    expect(store.mounted).toBeTruthy();
    store.unmount();
    expect(store.mounted).toBeFalsy();
  });
});
