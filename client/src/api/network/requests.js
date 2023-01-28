import { URLS } from './constants';

import { getApiInstance, getApiParams } from './index';

const checkLogin = (data) => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'POST',
    url: URLS.LOGIN,
    data,
    headers,
  });
};
const addUser = (data) => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'POST',
    url: URLS.REGISTRATION,
    data,
    headers,
  });
};
const createSetting = (data) => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'POST',
    url: URLS.CREATE_SETTING,
    data,
    headers,
  });
};

export default {
  checkLogin,
  addUser,
  createSetting
};
