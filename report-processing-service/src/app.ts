import healthcheck from './routes/healthcheck';
import Koa from 'koa';

const app = new Koa();
app.use(healthcheck.routes());

export default app;
