import {Context} from "koa";
import {NotFoundError, ForbiddenError} from '../errorHandler/customErrors';
import ReportModel, {Statuses} from "../models/reports";
import {validateUpdateReport, validateCreateNewReport} from "../validators/reports";


export const getReportById = async (ctx: Context) => {
    const report = await ReportModel.findById(ctx.params.id);
    if (!report) {
        throw new NotFoundError(`Report with ID ${ctx.params.id} was not found`);
    }
    ctx.body = report;
};

export const createNewReport = async (ctx: Context) => {
    if (!ctx.request.body) {
        throw new ForbiddenError();
    }

    const query = {
        userId: '1',
        ...validateCreateNewReport(ctx.request.body),
    };
    const report = new ReportModel(query);
    await report.save();

    ctx.body = report;
};

export const updateReport = async (ctx: Context) => {
    if (!ctx.request.body) {
        throw new ForbiddenError();
    }

    const query = validateUpdateReport(ctx.request.body);
    ctx.body = await ReportModel.findOneAndUpdate({'_id': ctx.params.id}, query, {new: true});
};

export const deleteReport = async (ctx: Context) => {
    await ReportModel.findOneAndUpdate({'_id': ctx.params.id}, {status: Statuses.CANCELED});
    ctx.response.status = 200;
};
