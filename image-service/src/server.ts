// import config from "./env";
import fs from "fs";

import dotenv from "dotenv";

import restify from "restify";

import errs from "restify-errors";

import logger from "./logger";

import Storage from "./storage";

import FileAdapter from "./flieAdapter";

const config = dotenv.config();
if (config.error) {
    throw config.error;
}

const filePath = __dirname + process.env.FILE_PATH;
const fileAdapter = new FileAdapter(filePath)
const storage = new Storage(fileAdapter);

const server = restify.createServer({ name: "image-server" });
server.use(restify.plugins.bodyParser({
    keepExtensions: true,
    multiples: true,
    uploadDir: "/Users/yzhunkivskyi/uploads",
}));

server.post("/images/upload", async (request, response, next) => {
    if (request.files) {
        for (const key in request.files) {
            if (request.files.hasOwnProperty(key)) {
                if (!request.files[key].type.startsWith("image/")) {
                    return next(new errs.InternalServerError("boom!"));
                }
                const file = storage.put(request.files[key].path);
            }
        }
    }

    response.send(200);
});

server.get("/images/:id", async (request, response) => {
    response.send(200);
});

server.listen(process.env.PORT, () => {
    logger.info("%s listening at %s", server.name, server.url);
});
