import Koa from 'koa';
import routes from './routes/index';

const app = new Koa();

app.use(routes.routes());

export default app;
