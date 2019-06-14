import HttpStatusCodes from "http-status-codes";
import {Notification, NotificationModel} from '../models/notification';
import {Context} from 'koa';

export interface NotificationResponse {
    id: string
}

function toNotificationResponse(model: NotificationModel): NotificationResponse {
    const { _id:id } = model;
    return { id }
}

export const notify = async (ctx: Context) => {
    const types = ctx.request.body.types as Array<string> || ['EMAIL'];

    const notifications = types.map((type:string) => ({
        inspectorId: ctx.request.body.inspectorId,
        reportId: ctx.request.body.reportId,
        type
    }));

    const res = await Notification.insertMany(notifications);

    ctx.status = HttpStatusCodes.CREATED;
    ctx.response.body = res.map(toNotificationResponse);
};

export const notifications = async (ctx: Context) => {
    ctx.status = HttpStatusCodes.OK;

    let p = new Promise((resolve, reject) => {
        Notification.find({}, function (err, users) {
            if (err) {  reject(err);   }
            else { resolve(users); }
        });
    });

    ctx.response.body = await p;
};
