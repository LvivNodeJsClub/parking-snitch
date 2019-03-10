import Koa from 'Koa';
import healthcheck from './routes/healthcheck';

const app = new Koa();
app.use(healthcheck.routes());

export {app};
