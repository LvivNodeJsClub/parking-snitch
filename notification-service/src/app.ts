import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors'
import notificationRoutes from './routes/notification';
import healthcheckRoutes from './routes/helathcheck';


const app = new Koa();

app.use(bodyParser());
app.use(cors());

app.use(notificationRoutes.routes());
app.use(notificationRoutes.allowedMethods());
app.use(healthcheckRoutes.routes());
app.use(healthcheckRoutes.allowedMethods());

export default app;
