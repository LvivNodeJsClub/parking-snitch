import httpStatusCodes from 'http-status-codes';

import {Controller, Route, Get} from "tsoa";

@Route('/healthcheck')
export class HealthcheckController extends Controller {
    @Get()
    public async healthcheck(): Promise<any> {
        this.setStatus(httpStatusCodes.OK);
    }
}