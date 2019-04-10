import {Server} from "restify";
import uploadImagesController from "../controllers/uploadImagesController";
import healthcheckController from "../controllers/healthcheckController";
import {IServices} from "../services/IServices";

export default (server: Server, {photoService, messageService}: IServices) => {
    /**
     * @swagger
     * /healthcheck:
     *    get:
     *      tags:
     *          - "healthcheck"
     *      summary: "Photo service health check"
     *      description: "This should return all users"
     *      produces:
     *          - "application/json"
     *      responses:
     *          200:
     *              description: "OK"
     */
    server.get("/healthcheck", healthcheckController);

    /**
     * @swagger
     * /images/upload:
     *    post:
     *      tags:
     *          - "images"
     *      summary: "Upload photo"
     *      description: "This should return all users"
     *      consumes:
     *          - "multipart/form-data"
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "reportId"
     *            in: "formData"
     *            description: "Report ID to which photo should be attached"
     *            required: true
     *            type: "string"
     *          - name: "files"
     *            in: "formData"
     *            description: "Photos which should be attached to report"
     *            required: true
     *            type: "file"
     *      responses:
     *          200:
     *              description: "OK"
     */
    server.post("/images/upload", uploadImagesController({photoService, messageService}));

    /**
     * @swagger
     * /images/{imageId}:
     *    get:
     *      tags:
     *          - "images"
     *      summary: "Get photo by id"
     *      description: "This should return all users"
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "imageId"
     *            in: "path"
     *            description: "Photo ID to return"
     *            required: true
     *            type: "string"
     *      responses:
     *          200:
     *              description: "OK"
     */
    server.get("/images/:id", (request, response) => {
        // TODO add implementation
        response.send(200);
    });
};
