/** K.Arthur 4/17/2019 */

import util from './util';
import { BUS } from './config';

/**
 * use for creating mock promise to simulate real xhr request
 * @param data
 * @param delay
 * @param failPercent
 * @param cache
 * @return {function(*=, *=): (Promise<any> | Promise)}
 */
export function createMockAPI(data, delay = 0, failPercent = 5, cache = false) {
  return (params, options = {}) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (util._rand(failPercent)) {
          reject(new Error('mock api data fail'));
        } else {
          const cacheKey = options[BUS.cacheKey];
          const timestamp = Date.now();

          if (cache && cacheKey) {
            BUS.db.setItem(cacheKey, { data, params, timestamp }).then(() => {
              // no-op & ignore fail
              resolve({ data, params });
            });
          } else {
            resolve({ data, params });
          }
        }
      }, delay);
    });
}

/**
 * create mock api with true cache
 * @param data
 * @param delay
 * @param failPercent
 * @return {function(*=, *=): (Promise<any>|Promise)}
 */
export function createCacheMockAPI(data, delay = 0, failPercent = 5) {
  return createMockAPI(data, delay, failPercent, true);
}
