/** K.Arthur 4/17/2019 */

export {
  cacheRequestInterceptor,
  cacheResponseInterceptor,
  timeoutInterceptor,
  interceptorPipe
} from './interceptor';

export {
  createGetXHR,
  createGetXHRFactory,
  createPostXHR,
  createPostXHRFactory,
  createCacheXHR
} from './xhr';

export {
  transformToFD,
  transformToString,
  transformToUSP,
  transformPipe
} from './transform';

export { createMockAPI, createCacheMockAPI } from './mock';

export { DB, DBDriver, use } from './config';
