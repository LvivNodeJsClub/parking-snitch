import app from './app'
import { init } from './init';
import logger from './logger';

const {PORT} = process.env;

init().then(() => {
    app.listen(PORT, () => logger.info(`Listening port ${PORT}`));
});
