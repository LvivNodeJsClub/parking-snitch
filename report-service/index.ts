import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import router from './routes';
import errorHandler from './errorHandler';
import RabbitmqConsumer from "./queueConsumer/rabbitmqConsumer";
import {imagesMessageHandler} from "./handlers";

const {PORT, DB_HOST, DB_PORT, DB_NAME, QUEUE_HOST, QUEUE_PORT, IMAGES_QUEUE_NAME} = process.env;

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
        await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true });
        console.log('Database connection successful');

        const rabbitmqConnection = await RabbitmqConsumer.getConnection(`amqp://${QUEUE_HOST}:${QUEUE_PORT}`);
        const rabbitmqConsumer = new RabbitmqConsumer(rabbitmqConnection);
        console.log('Rabbitmq connection successful');

        await rabbitmqConsumer.consumeMessagesFromQueue(IMAGES_QUEUE_NAME || "", imagesMessageHandler);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
