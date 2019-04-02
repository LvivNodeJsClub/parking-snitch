import {Server} from "restify";
import uploadImagesController from "../controllers/uploadImagesController";
import {IServices} from "../services/IServices";

export default (server: Server, {photoService, messageService}: IServices) => {
    server.post("/images/upload", uploadImagesController({photoService, messageService}));
    server.get("/images/:id", (request, response) => {
        // TODO add implementation
        response.send(200);
    });
};
