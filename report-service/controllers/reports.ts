import {Context} from "koa";
import ReportModel, {Statuses} from "../models/reports";
import {validateUpdateReport, validateCreateNewReport} from "../validators/reports";


export const getReportById = async (ctx: Context) => {
    ctx.body = await ReportModel.findById(ctx.params.id);
};

export const createNewReport = async (ctx: Context, next: Function) => {
    if (!ctx.request.body) {
        ctx.response.status = 403;
        return next();
    }

    const query = {
        userId: '1',
        location: {
            lat: 0,
            lon: 0,
        },
        ...validateCreateNewReport(ctx.request.body),
    };
    const report = new ReportModel(query);
    await report.save();

    ctx.body = report;
};

export const updateReport = async (ctx: Context, next: Function) => {
    if (!ctx.request.body) {
        ctx.response.status = 403;
        return next();
    }

    const query = validateUpdateReport(ctx.request.body);
    ctx.body = await ReportModel.findOneAndUpdate({'_id': ctx.params.id}, query, {new: true});
};

export const deleteReport = async (ctx: Context) => {
    await ReportModel.findOneAndUpdate({'_id': ctx.params.id}, {status: Statuses.CANCELED});
    ctx.response.status = 200;
};
