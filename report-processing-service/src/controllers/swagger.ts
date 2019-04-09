import httpStatusCodes from 'http-status-codes';
import {Controller, Route, Get} from 'tsoa';
import {Context} from 'koa';
import SwaggerService from '../services/swagger';

@Route('/swagger.json')
export class SwaggerController extends Controller {

  private swaggerService = new SwaggerService();

  @Get()
  public async get(): Promise<any> {
    this.setStatus(httpStatusCodes.OK);
    return this.swaggerService.documentation;
  }
}
