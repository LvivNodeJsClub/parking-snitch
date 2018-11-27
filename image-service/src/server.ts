import restify from "restify";
import {InvalidArgumentError} from "restify-errors";
import App from "./app";
import config from "./config";
import logger from "./logger";

const app = new App(config.defaultStorageType);
const server = restify.createServer({ name: "image-server" });

server.use(restify.plugins.bodyParser({
    keepExtensions: true,
    multiples: true,
}));

server.post("/images/upload", async (request, response, next) => {
    if (!request.files) {
        return next(new InvalidArgumentError("No files in request"));
    }
    const results = [];
    try {
        for (const key in request.files) {
            if (request.files[key] instanceof Array) {
                // @ts-ignore
                for (const file of request.files[key]) {
                    results.push(await app.upload(file));
                }
            } else if (request.files[key] instanceof Object) {
                // @ts-ignore
                results.push(await app.upload(request.files[key]));
            } else {
                throw new InvalidArgumentError("Invalid files in request");
            }
        }
    } catch (e) {
        next(e);
    }

    const res = await Promise.all(results);
    response.send(200, res);
    next();
});

server.get("/images/:id", async (request, response) => {
    response.send(200);
});

server.listen(process.env.PORT, () => {
    logger.info(`${server.name} listening at ${server.url}`);
});
