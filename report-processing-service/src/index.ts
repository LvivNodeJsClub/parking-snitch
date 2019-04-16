import config from './config';
import server from './server';
import Koa from 'koa';

server()
  .then((app: Koa) => {
    app.listen(config.port, () => console.log(`Listening port ${config.port}`));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
