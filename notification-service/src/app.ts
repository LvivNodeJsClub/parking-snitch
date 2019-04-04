import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import notificationRoutes from './routes/notification';
import healthcheckRoutes from './routes/helathcheck';

const app = new Koa();

app.use(bodyParser());

app.use(notificationRoutes.routes());
app.use(healthcheckRoutes.routes());

export default app;
