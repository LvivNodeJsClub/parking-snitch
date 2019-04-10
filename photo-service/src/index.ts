import server from "./server";
import logger from "./logger";
import setupDependencies from "./setup";
import setupRoutes from "./routes";
import setupSwagger from "./swagerSetup";
import {IServices} from "./services/IServices";

setupDependencies()
    .then((services: IServices)=> {
        setupRoutes(server, services);
        setupSwagger(server);
        server.listen(process.env.PORT, () => {
            logger.info(`${server.name} listening at ${server.url}`);
        });
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
