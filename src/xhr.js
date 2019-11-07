/** K.Arthur 4/17/2019 */

import { BUS } from './config';
import 'promise-polyfill/src/polyfill';
import * as interceptor from './interceptor';

/**
 * use for creating axios instance with basic options and interceptors
 * @param baseURL
 * @param options
 * @param interceptors
 * @return {AxiosInstance | Domain | *}
 */
export function createXHR(baseURL, options = {}, interceptors = {}) {
  const xhr = axios.create({ baseURL, ...options });
  xhr.interceptors.request.use(
    interceptors.request || interceptor.defaultRequestInterceptor
  );
  xhr.interceptors.response.use(
    interceptors.response || interceptor.defaultResponseInterceptor
  );
  return xhr;
}

/**
 * use for creating get request
 * @param baseURL
 * @param globalOptions
 * @param interceptors
 * @return {function(*): function(*, *): AxiosPromise}
 */
export function createGetXHR(baseURL, globalOptions = {}, interceptors) {
  return url => (params, specialOption) =>
    createXHR(
      baseURL,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: BUS.withCredentials,
        ...globalOptions
      },
      interceptors
    )({
      url,
      params,
      ...specialOption
    });
}

/**
 * use for creating factory of createGetXHR, this is useful when you want to
 * add common options to your get-creator rather than attach those options to
 * every request
 * @param options
 * @return {function(*=, *=, *=): function(*): function(*, *): AxiosPromise}
 */
export function createGetXHRFactory(options) {
  return (baseURL, globalOptions = {}, interceptors) =>
    createGetXHR(baseURL, { ...options, ...globalOptions }, interceptors);
}

/**
 * use for creating post request
 * @param baseURL
 * @param globalOptions
 * @param interceptors
 * @return {function(*): function(*, *): AxiosPromise}
 */
export function createPostXHR(baseURL, globalOptions = {}, interceptors) {
  return url => (data, specialOption) =>
    createXHR(
      baseURL,
      {
        url,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: BUS.withCredentials,
        ...globalOptions
      },
      interceptors
    )({
      url,
      data,
      ...specialOption
    });
}

/**
 * use for creating factory of createPostXHR, this is useful when you want to
 * add common options to your post-creator rather than attach those options to
 * every request
 * @param options
 * @return {function(*=, *=, *=): function(*): function(*, *): AxiosPromise}
 */
export function createPostXHRFactory(options) {
  return (baseURL, globalOptions = {}, interceptors) =>
    createPostXHR(baseURL, { ...options, ...globalOptions }, interceptors);
}

/**
 * use get/post request to create cache request
 * @param cacheKey
 * @param request
 * @return {function(*=, *=): (Promise<any> | Promise)}
 */
export function createCacheXHR(cacheKey, request) {
  return (params, options) =>
    new Promise((resolve, reject) => {
      BUS.db
        .getItem(cacheKey)
        .then(cacheValue => {
          if (cacheValue && Date.now() - cacheValue.timestamp < BUS.expire) {
            resolve(Promise.resolve(cacheValue));
          } else {
            resolve(request(params, { [BUS.cacheKey]: cacheKey, ...options }));
          }
        })
        .catch(() => {
          resolve(request(params, { [BUS.cacheKey]: cacheKey, ...options }));
        });
    });
}
