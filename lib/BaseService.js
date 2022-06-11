export class BaseService {
  #httpService = null;

  constructor(httpService) {
    this.#httpService = httpService;

    const methods = ['get', 'delete', 'head', 'options', 'post', 'put', 'patch', 'request'];

    for (const method of methods) {
      Object.defineProperty(this, method, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: this.#httpService[method],
      });
    }
  }

  setHeader(key, value) {
    delete this.#httpService.defaults.headers[key];
    delete this.#httpService.defaults.headers.common[key];
    this.#httpService.defaults.headers.common[key] = value;
  }

  async get(url, config) {}

  async delete(url, config) {}

  async head(url, config) {}

  async options(url, config) {}

  async post(url, payload, config) {}

  async put(url, payload, config) {}

  async patch(url, payload, config) {}

  async request(config) {}
}
