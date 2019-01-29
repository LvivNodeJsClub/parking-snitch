import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import router from './routes';
import errorHandler from './errorHandler';
import RabbitmqConsumer from "./queueConsumer/rabbitmqConsumer";
import {photosMessageHandler} from "./handlers";

const {PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, QUEUE_HOST, QUEUE_USER, QUEUE_PASSWORD, IMAGES_QUEUE_NAME} = process.env;

const DB_PORT = process.env.DB_PORT || 27017;
const QUEUE_PORT = process.env.QUEUE_PORT || 5672;


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

        const rabbitmqConsumer = new RabbitmqConsumer(`amqp://${QUEUE_HOST}:${QUEUE_PORT}/`);
        await rabbitmqConsumer.init();
        console.log('Rabbitmq connection successful');

        await rabbitmqConsumer.consumeMessagesFromQueue(IMAGES_QUEUE_NAME || "", photosMessageHandler);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
