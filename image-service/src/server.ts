import restify from "restify";
import {InvalidArgumentError} from "restify-errors";
import App from "./app";
import config from "./config";
import logger from "./logger";
import IMessageToUploadImages from "./queueProducer/IMessageToUploadImages";

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
        return next(e);
    }

    const resultImages = await Promise.all(results);

    try {
        const messageToUploadImages = {
            imageIds: resultImages.map(({image}) => image._id),
        } as IMessageToUploadImages;

        await app.notify(messageToUploadImages);
    } catch (error) {
        logger.error(error);
        return next(error);
    }

    response.send(200, resultImages);
    next();
});

server.get("/images/:id", async (request, response) => {
    response.send(200);
});

server.listen(process.env.PORT, () => {
    logger.info(`${server.name} listening at ${server.url}`);
});
