import {LazyGetter} from 'lazy-get-decorator';
import path from 'path';
import fs from 'fs';

export default class SwaggerService {

  @LazyGetter(true)
  public get documentation() {
    const swaggerDir = path.dirname(__dirname);
    const swaggerContent = fs.readFileSync(`${swaggerDir}/swagger.json`);

    try {
      return JSON.parse(swaggerContent.toString());
    } catch (error) {
      console.error(error);
    }
  }
}
