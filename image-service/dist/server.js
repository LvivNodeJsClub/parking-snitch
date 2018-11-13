"use strict";
// import config from "./env";
// import fs from "fs";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const restify_1 = __importDefault(require("restify"));
const logger_1 = __importDefault(require("./logger"));
const config = dotenv_1.default.config();
if (config.error) {
    throw config.error;
}
const server = restify_1.default.createServer({ name: "image-server" });
server.use(restify_1.default.plugins.bodyParser());
server.post("/images/upload", async (request, response) => {
    if (request.files) {
        for (let key in request.files) {
            if (request.files.hasOwnProperty(key)) {
                logger_1.default.debug(request.files[key].path);
            }
        }
    }
    response.send(200);
});
server.get("/images/:id", async (request, response) => {
    response.send(200);
});
server.listen(process.env.PORT, () => {
    logger_1.default.info("%s listening at %s", server.name, server.url);
});
