import Router from 'koa-router';
import HttpStatusCodes from "http-status-codes";

const router = new Router();

router.post('/notify', (ctx) => {
    ctx.status = HttpStatusCodes.CREATED;
    ctx.response.body = {
        id: 'someID'
    };
});

export default router;
