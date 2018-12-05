import restify from "restify";
import {InvalidArgumentError} from "restify-errors";
import PhotoService from "./services/photoService";
import MessageService from "./services/messageService";
import config from "./config";
import logger from "./logger";
import IMessageToUploadPhotos from "./queueProducer/IMessageToUploadPhotos";

const photoService = new PhotoService(config.defaultStorageType);
const messageService = new MessageService();
const server = restify.createServer({ name: "image-server" });

server.use(restify.plugins.bodyParser({
    keepExtensions: true,
    multiples: true,
}));

server.post("/images/upload", async (request, response, next) => {
    if (!request.files) {
        return next(new InvalidArgumentError("No files in request"));
    }
    if (!request.body.reportId) {
        return next(new InvalidArgumentError("No reportId in request"));
    }
    const results = [];
    const { reportId } = request.body;
    try {
        for (const key in request.files) {
            if (request.files[key] instanceof Array) {
                // @ts-ignore
                for (const file of request.files[key]) {
                    results.push(await photoService.upload(file, reportId));
                }
            } else if (request.files[key] instanceof Object) {
                // @ts-ignore
                results.push(await photoService.upload(request.files[key], reportId));
            } else {
                throw new InvalidArgumentError("Invalid files in request");
            }
        }
    } catch (e) {
        return next(e);
    }

    const resultPhotos = await Promise.all(results);

    try {
        const messageToUploadPhotos = {
            reportId,
            photoIds: resultPhotos.map(({photo}) => photo._id.toString()),
        } as IMessageToUploadPhotos;

        await messageService.notify(messageToUploadPhotos);
    } catch (error) {
        logger.error(error);
        return next(error);
    }

    response.send(200, resultPhotos);
    next();
});

server.get("/images/:id", async (request, response) => {
    response.send(200);
});

server.listen(process.env.PORT, () => {
    logger.info(`${server.name} listening at ${server.url}`);
});
