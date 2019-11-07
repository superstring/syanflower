## Syanflower

Powerful request for browser.

### Features

- All features from axios
- All features from localforage
- Auto cache request
- Abstract request method

---

### Installing

- Using npm: `npm install syanflower --save`
- Using yarn: `yarn add syanflower`
- Using CDN:

```
<script src="https://unpkg.com/syanflower/dist/syanflower.min.js"></script>
```

---

### Example

Performing a common request

```
    // GET
    var getProxy = SF.createGetXHR('./');
    var getRequest = getProxy('data.json');
    getRequest({key: 10}).then(function(response) {
      console.log(response.data);
    });

    // POST
    var postProxy = SF.createPostXHR('./');
    var postRequest = postProxy('data.json');
    postRequest({key: 10}).then(function(response) {
      console.log(response.data);
    });
```

Performing a cache request

```
    // GET
    var getProxy = SF.createGetXHR('./');
    var getRequest = SF.createCacheXHR('data', getProxy('data.json'));
    getRequest({key: 10}).then(function(response) {
      console.log(response.data);
    });

    // POST
    var postProxy = SF.createPostXHR('./');
    var postRequest = SF.createCacheXHR('data', postProxy('data.json'));
    postRequest({key: 10}).then(function(response) {
      console.log(response.data);
    });
```

---

### API

Interceptor

- `cacheRequestInterceptor(response)`
- `cacheResponseInterceptor(response)`
- `timeoutInterceptor(response)`
- `interceptorPipe(...interceptors)`

Creator & Factory: all options will be merged, outer is prior

- `createGetXHR(baseURL, globalOptions, interceptors)`
- `createGetXHRFactory(options)`
- `createPostXHR(baseURL, globalOptions, interceptors)`
- `createPostXHRFactory(options)`
- `createCacheXHR(cacheKey, request)`, data stored in Map<cacheKey, response> format

Transformer

- `transformToFD(data)`
- `transformToString(data)`
- `transformToUSP(data)`
- `transformPipe(...transformers)`

Mocker

- `createMockAPI(data, delay, failPercent, cache)`
- `createCacheMockAPI(data, delay, failPercent)`

---

### Config

Database: using `SF.DB.config(...)`, details in [localforage](https://localforage.github.io/localForage/)

```
    SF.DB.config({name: 'app', storeName: 'store', driver: SF.DBDriver.LOCALSTORAGE});
```

Request: just like config [axios](https://www.npmjs.com/package/axios) with request-creator

```
    var options = {};
    var interceptors = {
      reponse: SF.interceptorPipe(SF.timeoutInterceptor, SF.cacheResponseInterceptor),
    };
    var getProxy = SF.createGetXHR('./', options, interceptors);
```

Self:

```
    SF.use({
      cacheKey: 'syanflower', // use for searching flag key in request config, keep it is ok
      expire: 24 * 60 * 60 * 1000, // cache expire in milliseconds unit
      withCredentials: true, // mixed into request headers, you can change it in request-creator or request
    });
```

---

### Building

- Clone: `git clone https://gitee.com/neuro-link/syanflower.git`
- Install dependencies: `npm install` or `yarn install`
- Customize configuration: update `buildConfig.format` in package.json, details in [rollup](https://www.rollupjs.com/guide/zh)
- Build: `npm run build` or `yarn build`
