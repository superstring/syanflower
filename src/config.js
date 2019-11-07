/** K.Arthur 4/17/2019 */

import 'localforage/dist/localforage';

export const DB = localforage.createInstance({
  name: 'default_database',
  storeName: 'default_store',
  description: 'cached request database'
});

export const DBDriver = {
  INDEXEDDB: localforage.INDEXEDDB,
  WEBSQL: localforage.WEBSQL,
  LOCALSTORAGE: localforage.LOCALSTORAGE
};

/** global config */
export const BUS = {
  db: DB,
  cacheKey: 'syanflower',
  expire: 24 * 60 * 60 * 1000,
  withCredentials: true
};

/**
 * use for updating global config
 * @param config
 */
export function use(config = {}) {
  config.expire && (BUS.expire = config.expire);
  config.cacheKey && (BUS.cacheKey = config.cacheKey);
  config.withCredentials && (BUS.withCredentials = config.withCredentials);
}
