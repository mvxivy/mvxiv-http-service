export class BaseService {
  #httpService = null;

  constructor(httpService) {
    this.#httpService = httpService;

    ['get', 'delete', 'head', 'options', 'post', 'put', 'patch', 'request'].forEach(method => {
      Object.defineProperty(this, method, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: this.#httpService[method],
      });
    });
  }

  setHeader(key, value) {
    delete this.#httpService.defaults.headers[key];
    delete this.#httpService.defaults.headers.common[key];
    this.#httpService.defaults.headers.common[key] = value;
  }

  get(url, config) {}

  delete(url, config) {}

  head(url, config) {}

  options(url, config) {}

  post(url, payload, config) {}

  put(url, payload, config) {}

  patch(url, payload, cofig) {}

  request(config) {}
}
