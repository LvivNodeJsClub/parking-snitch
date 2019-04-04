import {InvalidArgumentError} from "restify-errors";
import IMessageToUploadPhotos from "../queueProducer/IMessageToUploadPhotos";
import logger from "../logger";
import {Request, Response, Next} from "restify";
import {IServices} from "../services/IServices";

export default ({photoService, messageService}: IServices) => async (request: Request, response: Response, next: Next) => {
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
};
