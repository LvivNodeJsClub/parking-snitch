import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import router from './routes';
import errorHandler from './errorHandler';
import RabbitmqConsumer from "./queueConsumer/rabbitmqConsumer";
import {PhotosMessageHandler} from "./handlers";
import RabbitmqProducer from './queueProducer/rabbitmqProducer';
import config from './config';
import MessageService from './service/messageService';

init().then(() => {
    const app = new Koa();

    app
        .use(errorHandler)
        .use(bodyParser())
        .use(router.routes())
        .use(router.allowedMethods());

    app.listen(config.listenPort, () => console.log(`Listening port ${config.listenPort}`));
});

async function init() {
    try {
        await mongoose.connect(config.monogo.connection, config.monogo.options);
        console.log('Database connection successful');

        const rabbitmqConsumer = new RabbitmqConsumer(config.reportImagesQueue.connection);
        await rabbitmqConsumer.init();
        console.log('RabbitmqConsumer connection successful');

        const rabbitmqProducer = new RabbitmqProducer(config.reportReadyForProcessingQueue.connection);
        await rabbitmqProducer.init();
        console.log('RabbitmqProducer connection successful');

        const messageService = new MessageService(rabbitmqProducer);
        await rabbitmqConsumer.consumeMessagesFromQueue(config.reportImagesQueue.queueName, PhotosMessageHandler(messageService));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
