import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import router from './routes';
import errorHandler from './errorHandler';

const {PORT, DB_HOST, DB_PORT, DB_NAME} = process.env;

mongoose
    .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true })
    .then(() => console.log('Database connection successful'))
    .catch((err: Error) => console.error(err));

const app = new Koa();

app
    .use(errorHandler)
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(PORT, () => console.log(`Listening port ${PORT}`));
