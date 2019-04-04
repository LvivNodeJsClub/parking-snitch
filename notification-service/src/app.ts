import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import notificationRoutes from './routes/notification';
import healthcheckRoutes from './routes/helathcheck';
import mongoose from 'mongoose';

const {DB_PORT = 27017, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

const app = new Koa();

app.use(bodyParser());

app.use(notificationRoutes.routes());
app.use(healthcheckRoutes.routes());

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/`, {
    useNewUrlParser: true,
    user: DB_USER,
    pass: DB_PASSWORD,
    dbName: DB_NAME,
}).catch((error) => {
    console.error(error);
    process.exit(1);
});

export default app;
