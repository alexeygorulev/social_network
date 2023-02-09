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
const getSettingById = (id) => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'GET',
    url: URLS.GET_SETTING_BY_ID.replace(':id', id),
    headers,
  });
};
const getProfile = () => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'GET',
    url: URLS.GET_PROFILE,
    headers,
  });
};
const getFriendProfile = (id) => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'GET',
    url: `${URLS.GET_FRIEND_PROFILE}${id}`,
    headers,
  });
};
const getFriends = () => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'GET',
    url: URLS.GET_FRIENDS_LIST,
    headers,
  });
};
const getFriendsList = (id) => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'GET',
    url: `${URLS.GET_FRIENDS}${id}`,
    headers,
  });
};
const getUsers = () => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'GET',
    url: URLS.GET_USERS_LIST,
    headers,
  });
};
const getFriendsRequests = () => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'GET',
    url: URLS.GET_FRIENDS_REQUESTS,
    headers,
  });
};
const getFriendsAcceptList = () => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'GET',
    url: URLS.FRIEND_ACCEPT_LIST,
    headers,
  });
};

const createFriendRequest = (data) => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'POST',
    url: URLS.CREATE_FRIENDS_REQUESTS,
    data,
    headers,
  });
};
const createAvatar = (data) => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'POST',
    url: URLS.CREATE_AVATAR,
    data,
    headers,
  });
};
const declineRequestFriend = (data) => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'POST',
    url: URLS.FRIEND_DECLINE,
    data,
    headers,
  });
};
const acceptFriend = (data) => {
  const apiParams = getApiParams();
  const headers = {};

  if (apiParams.authorizationToken) headers.Authorization = `Bearer ${apiParams.authorizationToken}`;

  return getApiInstance()({
    method: 'POST',
    url: URLS.FRIEND_ACCEPT,
    data,
    headers,
  });
};

export default {
  checkLogin,
  addUser,
  createSetting,
  getSettingById,
  getProfile,
  getFriends,
  getUsers,
  getFriendsRequests,
  createFriendRequest,
  acceptFriend,
  getFriendsAcceptList,
  declineRequestFriend,
  getFriendProfile,
  getFriendsList,
  createAvatar,
};
