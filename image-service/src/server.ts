import restify from "restify";
import errs from "restify-errors";
import {storage} from "./app";
import logger from "./logger";

const server = restify.createServer({ name: "image-server" });

server.use(restify.plugins.bodyParser({
    keepExtensions: true,
    multiples: true,
}));

server.post("/images/upload", async (request, response, next) => {
    if (!request.files) {
        return next(new errs.InvalidArgumentError("No files in request"));
    }
    try {
        for (const key in request.files) {
            if (request.files[key] instanceof Array) {
                // @ts-ignore
                for (const file of request.files[key]) {
                    const newPath = await storage.put(file);
                }
            } else if (request.files[key] instanceof Object) {
                // @ts-ignore
                const newPath = await storage.put(request.files[key]);
            } else {
                throw new Error("Invalid files in request");
            }
        }
    } catch (e) {
        next(e);
    }

    response.send(200);
    next();
});

server.get("/images/:id", async (request, response) => {
    response.send(200);
});

server.listen(process.env.PORT, () => {
    logger.info(`${server.name} listening at ${server.url}`);
});
