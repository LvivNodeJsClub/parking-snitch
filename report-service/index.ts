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

const {PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;
const DB_PORT = process.env.DB_PORT || 27017;

init().then(() => {
    const app = new Koa();

    app
        .use(errorHandler)
        .use(bodyParser())
        .use(router.routes())
        .use(router.allowedMethods());

    app.listen(PORT, () => console.log(`Listening port ${PORT}`));
});

async function init() {
    try {
        await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/`, { 
            useNewUrlParser: true,
            user: DB_USER, 
            pass: DB_PASSWORD, 
            dbName: DB_NAME,
        });
        console.log('Database connection successful');

        const rabbitmqConsumer = new RabbitmqConsumer(config.reportImagesQueue.connection);
        await rabbitmqConsumer.init();
        console.log('RabbitmqConsumer connection successful');

        const rabbitmqProducer = new RabbitmqProducer(config.reportReadyForProcessingQueue.connection);
        await rabbitmqProducer.init()
        console.log('RabbitmqProducer connection successful');

        const messageService = new MessageService(rabbitmqProducer);
        await rabbitmqConsumer.consumeMessagesFromQueue(config.reportImagesQueue.queueName, PhotosMessageHandler(messageService));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
