// import config from "./env";
// import fs from "fs";

import dotenv from "dotenv";

import restify from "restify";

import logger from "./logger";

const config = dotenv.config();
if (config.error) {
    throw config.error;
}

const server = restify.createServer({ name: "image-server" });
server.use(restify.plugins.bodyParser());

server.post("/images/upload", async (request, response) => {
    if (request.files) {
        for (let key in request.files) {
            if (request.files.hasOwnProperty(key)) {
                logger.debug(request.files.key.path);
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
