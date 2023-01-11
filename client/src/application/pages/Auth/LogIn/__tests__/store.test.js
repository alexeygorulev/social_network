import { create as createRoot } from '../../../../store';

describe('Component Login', () => {
  let rootStore;

  beforeEach(() => {
    rootStore = createRoot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('testing login', async function init() {
    const { authContent: authStore } = rootStore;
    const { loginStore: store } = authStore;
    const sendCheckLogin = jest.spyOn(store, 'checkLogin');
    const checkFieldsOnSaveSpy = jest.spyOn(store, 'checkFieldsOnSave');
    const setError = jest.spyOn(rootStore, 'createNotificationMessage');

    await store.checkLogin();
    expect(sendCheckLogin).toHaveBeenCalledTimes(1);

    expect(checkFieldsOnSaveSpy).toHaveBeenCalledTimes(1);
    expect(setError).toHaveBeenCalledTimes(1);
  });
});
