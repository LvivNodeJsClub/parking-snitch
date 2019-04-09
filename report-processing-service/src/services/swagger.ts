import {LazyGetter} from 'lazy-get-decorator';
import path from 'path'
import fs from 'fs';

export default class SwaggerService {

  @LazyGetter(true)
  public get documentation() {
    const swaggerDir = path.dirname(__dirname);
    const swaggerContent = fs.readFileSync(`${swaggerDir}/swagger.json`)
    
    try {
      const swaggerDocumentation = JSON.parse(swaggerContent.toString()); 
      return swaggerContent;
    } catch (error) {
      console.error(error);
    }
  }
}