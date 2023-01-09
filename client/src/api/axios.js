import axios from "axios";

export const API_CANCELED_MESSAGE = "canceled";

export const cancels = {};

export const getCancelToken = (cancelToken) => {
  if (cancelToken) cancelToken.cancel(API_CANCELED_MESSAGE);
  return axios.CancelToken.source();
};

export function createInstance(baseURL) {
  const instance = axios.create({
    validateStatus: (status) => status >= 200 && status < 400,
    baseURL,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return instance;
}
