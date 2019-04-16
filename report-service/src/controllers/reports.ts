import HttpStatus from 'http-status-codes';
import {NotFoundError, BadRequestError} from '../errorHandler/customErrors';
import {Report, IReport, Statuses} from "../models/reports";
import {validateUpdateReport, validateCreateNewReport} from "../validators/reports";
import {Body, Controller, Delete, Get, Patch, Post, Route, SuccessResponse} from "tsoa";

@Route('reports')
export class ReportsController extends Controller {
    @Get('{id}')
    public async getReportById(id: string): Promise<IReport> {
        const report = await Report.findById(id);
        if (!report) {
            throw new NotFoundError(`Report with ID ${id} was not found`);
        }
        return report;
    }

    @SuccessResponse('201', 'Created') // Custom success response
    @Post()
    public async createNewReport(@Body() requestBody: IReport): Promise<IReport> {
        if (!requestBody) {
            throw new BadRequestError();
        }

        const query = {
            userId: '1', // TODO: use real userId when we implement Users support
            ...validateCreateNewReport(requestBody),
        };
        const report = new Report(query);
        await report.save();

        return report;
    }

    @Patch('{id}')
    public async modifyReport(id: string, @Body() requestBody: IReport): Promise<IReport | null > {
        if (!requestBody) {
            throw new BadRequestError();
        }

        const query = validateUpdateReport(requestBody);
        return Report.findOneAndUpdate({'_id': id}, query, {new: true});
    }

    @Delete('{id}')
    public async deleteReport(id: string): Promise<void> {
        await Report.findOneAndUpdate({'_id': id}, {status: Statuses.CANCELED});
        this.setStatus(HttpStatus.NO_CONTENT)
    }

}
