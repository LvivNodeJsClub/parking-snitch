import httpStatusCodes from 'http-status-codes';
import {Context} from 'koa';

export const healthcheck = async (ctx: Context) => {
    ctx.status = httpStatusCodes.OK;
};
