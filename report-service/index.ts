import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import router from './routes'

const app = new Koa();

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => console.log("Listening port 3000"));
