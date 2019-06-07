import logger from './logger';
import setupRoutes from './routes';
import server from './server';
import { IServices } from './services/services';
import setupDependencies from './setup';
import setupSwagger from './swaggerSetup';

setupDependencies()
	.then((services: IServices) => {
		setupRoutes(server, services);
		setupSwagger(server);
		server.listen(process.env.PORT, () => {
			logger.info(`${server.name} listening at ${server.url}`);
		});
	})
	.catch(error => {
		logger.error(error);
		process.exit(1);
	});
