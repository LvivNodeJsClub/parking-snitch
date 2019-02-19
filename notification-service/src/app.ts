import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import routes from './routes/notification';
import mongoose from 'mongoose';

const app = new Koa();

app.use(bodyParser());

app.use(routes.routes());

mongoose.connect(`mongodb://localhost:32768/notifications_test`, {useNewUrlParser: true});

export default app;
