export class BaseService {
  #httpService = null;

  constructor(httpService) {
    this.#httpService = httpService;

    ['get', 'delete', 'head', 'options', 'post', 'put', 'patch', 'request'].forEach(method => {
      Object.defineProperty(this, method, {
        configurable: false,
        enumerable: true,
        writable: false,
        value: this.#httpService[method],
      });
    });
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