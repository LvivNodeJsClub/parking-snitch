import { Context } from 'koa';
import Router from 'koa-router';

const router = new Router();

router.get('/', (ctx: Context) => {
    ctx.body = 'Hello world'
});

export default router;
