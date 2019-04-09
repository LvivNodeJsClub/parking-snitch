import {Get, Route, Controller } from 'tsoa';
import httpStatusCodes from "http-status-codes";

@Route('healthcheck')
export class HealthCheckController extends Controller {
    @Get('')
    public async getHealthCheck(): Promise<void> {
        this.setStatus(httpStatusCodes.OK);
    }
}
