import { createInstance } from "api/axios";

let apiInstance;

const apiParams = {};

export function configureApiInstance(params) {
  apiInstance = createInstance(params.baseUrl);

  if (params.authorizationToken)
    apiParams.authorizationToken = params.authorizationToken;
}

export function getApiInstance() {
  return apiInstance;
}

export function getApiParams() {
  return apiParams;
}
