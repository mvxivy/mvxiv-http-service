import { createApiServiceContainer } from '../lib/ioc.js';

class ExampleService {
  #fooService = null;
  #barService = null;
  constructor(fooService, barService) {
    this.#fooService = fooService;
    this.#barService = barService;
  }

  test() {
    console.log(this.#barService);
    console.log(this.#fooService);
  }
}
class FooService {}
class BarService {}

const constructorDict = {
  exampleService: [ExampleService, new FooService(), new BarService()],
};

const container = createApiServiceContainer(constructorDict, { baseURL: 'http://example.com' });

container.exampleService.test();
