import Koa from 'koa';
import config from './config';
import router from './routes';
import {swaggerRouter} from './routes/swagger';

const app = new Koa();

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(swaggerRouter(config.baseUrl));

export default app;
