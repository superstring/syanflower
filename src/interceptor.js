/** K.Arthur 4/17/2019 */

import { BUS } from './config';
import util from './util';

export function cacheRequestInterceptor(config) {
  return config;
}

/**
 * response interceptor for caching data
 * @param response
 * @return {*}
 */
export function cacheResponseInterceptor(response) {
  const { config, data } = response;

  const cacheKey = config[BUS.cacheKey];
  const timestamp = Date.now();

  if (cacheKey) {
    // use {data} to keep same structure, but drop other fields
    // use timestamp to simulate expire
    BUS.db.setItem(cacheKey, { data, timestamp }).then(() => {
      // no-op & ignore fail
    });
  }

  return response;
}

export function defaultRequestInterceptor(config) {
  return cacheRequestInterceptor(config);
}

export function defaultResponseInterceptor(response) {
  return cacheResponseInterceptor(response);
}

/**
 * interceptor for handling timeout
 * usage:
 *    timeoutInterceptor(error => {});
 * @param callback
 * @return {Function}
 */
export function timeoutInterceptor(callback) {
  return error => {
    const { code, message } = error;
    if (code === 'ECONNABORTED' && message.indexOf('timeout') > -1) {
      callback(error);
    }
  };
}

/**
 * pipe for mul-interceptor
 * usage:
 *    interceptorPipe(timeoutInterceptor, cacheResponseInterceptor);
 * @param rest
 * @return {function(*): *}
 */
export function interceptorPipe(...rest) {
  return util._pipe(rest);
}
