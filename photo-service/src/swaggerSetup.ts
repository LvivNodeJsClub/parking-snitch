import swaggerJsdoc from "swagger-jsdoc";
import {Server} from "restify";
const swaggerUi = require("swagger-ui-restify");

const options = {
    swaggerDefinition: {
        // Like the one described here: https://swagger.io/specification/#infoObject
        info: {
            title: "Photo Service",
            version: "1.0.0",
            description: "Photo Service API with autogenerated swagger doc",
        },
        tags: [
            {
                name: "healthcheck",
                description: "",
            },
            {
                name: "images",
                description: "",
            }
        ]
    },
    apis: ["dist/routes/*"],
};

const specs = swaggerJsdoc(options);

export default (server: Server) => {
    server.get("/api-docs", swaggerUi.setup(specs));
    server.get("/swagger-ui*", ...swaggerUi.serve);
    server.get("/swagger.json", (_, res) => res.json(specs))
};
