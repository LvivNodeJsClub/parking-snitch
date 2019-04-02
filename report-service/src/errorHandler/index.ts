import {Context} from "koa";

export default async function (ctx: Context, next: Function) {
    try {
        await next();
    } catch (err) {
        err.status = err.status || 500;
        ctx.response.status = err.status;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
}
