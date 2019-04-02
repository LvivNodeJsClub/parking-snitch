import Koa from "koa";
import errorHandler from "./errorHandler";
import bodyParser from "koa-bodyparser";
import router from "./routes";

const app = new Koa();

app
    .use(errorHandler)
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

export {
    app
}
