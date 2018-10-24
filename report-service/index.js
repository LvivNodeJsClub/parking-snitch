"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const routes_1 = __importDefault(require("./routes"));
const app = new koa_1.default();
app
    .use(koa_bodyparser_1.default())
    .use(routes_1.default.routes())
    .use(routes_1.default.allowedMethods());
app.listen(3000, () => "Listening port 3000");
