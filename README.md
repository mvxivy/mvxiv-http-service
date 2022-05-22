# HTTP Service

## Usage

**useHttpService(config, customs)**

> config - axios instance config
>
> customs - interceptors, serializers as custom plugins collection

```javascript
import { useHttpService } from 'http-service';

const { httpService, defineService, setHeader } = useHttpService({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
```
