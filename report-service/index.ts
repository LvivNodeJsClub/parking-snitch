import config from './config';
import {init} from './init';
import {app} from './server';

init().then(() => {
    app.listen(config.listenPort, () => console.log(`Listening port ${config.listenPort}`));
});
