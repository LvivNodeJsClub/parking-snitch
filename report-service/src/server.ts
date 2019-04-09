import Koa from "koa";
import errorHandler from "./errorHandler";
import bodyParser from "koa-bodyparser";
import router from "./routes";
import {loadDocumentSync} from 'swagger2';
import { ui } from 'swagger2-koa';
import {resolve} from "path";

const app = new Koa();

const document = loadDocumentSync(resolve(__dirname, './swagger.yaml'));

app
    .use(errorHandler)
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(ui(document, "/swagger/"))
;

export {
    app
}
