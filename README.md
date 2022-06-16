# HTTP Service

### _based on [axios](https://axios-http.com/docs)_

## Provides
* ### useHttpService
* ### createApiServiceContainer
* ### BaseService

## Usage
---
**`useHttpService`**([config](https://axios-http.com/docs/req_config), [interceptors](https://github.com/axios/axios#interceptors))


### 1. setup
```javascript
// http.service.js

import { useHttpService } from '@mvxiv/http-service';
import { 
  paramsSerializer,
  requestSerializer,
  responseSerializer
} from './lib/serializers';
import { right, left } from './lib/monades/either';

const config = {
  baseURL: 'https://some-domain.com/api',
  paramsSerializer,
  transformRequest: [requestSerializer],
  transformResponse: [responseSerializer],
};

// just example
const interceptors = {
  request: [(config) => (config.headers['Accept'] = 'application/json'), undefined]
  response: [
    [res => right(res), error => left(error)]
  ],
};

export const { 
  httpService,
  defineService,
  setHeader,
  setInterceptors
} = useHttpService(config, interceptors);
```


### 2. Use dependency injection
```javascript
// user.service.js

export class UserService {
  #httpService = null;

  constructor(httpService) {
    this.#httpService = httpService;
  }

  get http() {
    return this.#httpService;
  }

  async getUser(params) {
    return await this.http.get('/users/1', { params });
  } 
}

```
### 3. or simple

```javascript
// products.js

import { httpService } from '../services/http.service.js'

httpService.get('/products', { params: { limit: 10, offset: 20 } });
```
___

**`createApiServiceContainer`**(`constructorsDict`, `httpConfig`, `httpInterceptors`)

`httpConfig` and `httpInterceptors` contracts equals to `useHttpService` arguments.<br>
`constructorsDict` is dictionary of constructors (key, value pairs), for example:
```javascript
// api.ioc.js

import { UserService } from '../services/UserService.js';
import { ProductService } from '../services/ProductService.js';
import { PaymentService } from '../services/PaymentService.js';

class FooDependencyService {};
class BarDependencyService {};

const constructorsDict = {
  UserService,
  productService: ProductService,
  // additional syntax (from v.1.1.2) first place - constructor, rest - arguments
  paymentService: [
    PaymentService,
    new FooDependencyService(),
    new BarDependencyService()
  ],
};
```

and use factory:
```javascript
// api.ioc.js

// ...
import { createApiServiceContainer } from '@mvxiv/http-service';

//...
const config = {
  baseURL: 'https//some-domain.com/api'
};

export const container = createApiServiceContainer(constructorsDict, config) // interceptors is optional param
```
___
**`BaseService`**(`httpService`)

Is class for inheritance and provide to your own classes context http methods and `setHeader` method.

http methods provides: `get, delete, head, options, post, put, patch` and axios special `request`

```javascript
// transaction.service.js

import { BaseService } from '@mvxiv/http-service';
import { httpService } from '../services/http.service.js';

export class TransactionService extends BaseService {
  constructor(httpService, some, other, args) {
    super(httpService);
    // ...
  }

  async getTransactions(params) {
    return await this.get('/transactions', { params });
  }

  async createNewTransaction(payload) {
    return await this.post('/transactions', payload);
  }
}

```