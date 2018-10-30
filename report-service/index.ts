import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import router from './routes';

const HOST = 'localhost';
const PORT = '16717';
const DATABASE = 'report-service';

mongoose
    .connect(`mongodb://${HOST}:${PORT}/${DATABASE}`, { useNewUrlParser: true })
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error(err));

const app = new Koa();

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => console.log('Listening port 3000'));
