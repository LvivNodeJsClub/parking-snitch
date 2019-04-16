import httpStatusCodes from 'http-status-codes';
import {Controller, Route, Get} from 'tsoa';
import {Context} from 'koa';

@Route('/healthcheck')
export class HealthcheckController extends Controller {

  @Get()
  public async get() {
    this.setStatus(httpStatusCodes.OK);
    return 'OK';
  }
}
