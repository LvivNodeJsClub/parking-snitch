import config from './config';
import server from './server';

server
  .then((app) => {
    app.listen(config.port, () => console.log(`Listening port ${config.port}`));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
