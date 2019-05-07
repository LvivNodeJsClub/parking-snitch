import config from './config';
import logger from './logger';
import server from './server';
import Koa from 'koa';

server()
  .then((app: Koa) => {
    app.listen(config.port, () => logger.info(`Listening port ${config.port}`));
  })
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  });
