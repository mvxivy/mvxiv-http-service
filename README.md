# HTTP Service

### _based on [axios](https://axios-http.com/docs)_

## Provides
* ### useHttpService
* ### createApiServiceContainer
* ### BaseService

## Usage
___
**`useHttpService`([config](https://axios-http.com/docs/req_config), [interceptors](https://github.com/axios/axios#interceptors))** 

```javascript
import { useHttpService } from 'http-service';
import { 
  getParamsSerializer,
  requestSerializer,
  responseSerializer
} from './lib/serializers'

const config = {
  baseURL: 'https://jsonplaceholder.typicode.com',
};

const interceptors = {
  serializers: {
    getParamsSerializer,
    requestSerializers: [requestSerializer],
    responseSerializers: [responseSerializer],
  },
  interceptors: {
    request: [(config) => (config.headers['Accept'] = 'application/json'), undefined]
    response: [
      [res => right(res), error => left(error)]
    ],
  },
}

const { 
  httpService,
  defineService,
  setHeader,
  setInterceptors
} = useHttpService(config, interceptors);
```
