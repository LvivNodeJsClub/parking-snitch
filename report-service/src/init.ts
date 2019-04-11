import mongoose from "mongoose";
import config from "./config";
import RabbitmqConsumer from "./queueConsumer/rabbitmqConsumer";
import RabbitmqProducer from "./queueProducer/rabbitmqProducer";
import MessageService from "./service/messageService";
import {PhotosMessageHandler} from "./handlers";

export async function init() {
    try {
        await mongoose.connect(config.monogo.connection, config.monogo.options);
        console.log('Database connection successful');

        const rabbitmqConsumer = new RabbitmqConsumer(config.reportImagesQueue.connection);
        await rabbitmqConsumer.init();
        console.log('RabbitmqConsumer connection successful');

        const rabbitmqProducer = new RabbitmqProducer(config.reportReadyForProcessingQueue.connection);
        await rabbitmqProducer.init();
        console.log('RabbitmqProducer connection successful');

        const messageService = new MessageService(rabbitmqProducer, config.reportReadyForProcessingQueue.queueName);
        await rabbitmqConsumer.consumeMessagesFromQueue(config.reportImagesQueue.queueName, PhotosMessageHandler(messageService));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
