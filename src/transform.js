/** K.Arthur 4/17/2019 */

import 'url-search-params-polyfill';
import util from './util';

/**
 * transform plain object to URLSearchParams
 * @param data
 * @return {string|URLSearchParams}
 */
export function transformToUSP(data) {
  if (!data) {
    return '';
  }

  const uspData = new URLSearchParams();
  Object.keys(data).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      uspData.append(key, data[key]);
    }
  });
  return uspData;
}

/**
 * transform plain object to FormData
 * @param data
 * @return {string|FormData}
 */
export function transformToFD(data) {
  if (!data) {
    return '';
  }

  const fmData = new FormData();
  Object.keys(data).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      fmData.append(key, data[key]);
    }
  });

  return fmData;
}

/**
 * transform data to string
 * @param data
 * @return {*}
 */
export function transformToString(data) {
  try {
    return data.toString();
  } catch (error) {
    return data;
  }
}

/**
 * pipe for mul-transform
 * usage:
 *    transformPipe(transformToUSP, transformToFD, transformToString);
 * @param rest
 * @return {function(*): *}
 */
export function transformPipe(...rest) {
  return util._pipe(rest);
}
