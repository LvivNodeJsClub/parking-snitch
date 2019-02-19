import HttpStatusCodes from "http-status-codes";
import {Notification} from '../models/notification';
import {Context} from 'koa';

export const notify = async (ctx: Context) => {
    const notification = new Notification({inspectorId: ctx.request.body.inspectorId, reportId: ctx.request.body.reportId});
    await notification.save();

    ctx.status = HttpStatusCodes.CREATED;
    ctx.response.body = {
        id: notification._id
    };
};