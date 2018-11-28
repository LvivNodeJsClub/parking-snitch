import mongoose, {Connection} from "mongoose";
import config from "./config";
import logger from "./logger";
import ImageModel from "./models/image";
import StorageService, {IFile} from "./storage/storage";
import StorageManager, {StorageTypes} from "./storage/storageManager";
import IQueueProducer from "./queueProducer/IQueueProducer";
import IMessageToUploadImages from "./queueProducer/IMessageToUploadImages";
import RabbitmqProducer from "./queueProducer/rabbitmqProducer";

export default class App {
    private readonly storage: StorageService | undefined;
    private db: Connection;
    private rabbitmqProducer: IQueueProducer | undefined;
    private readonly queueName = "images_queue";
    constructor(storageType: StorageTypes) {
        this.storage = StorageManager.getStorage(storageType);
        mongoose.connect(config.db.connection, {
            useNewUrlParser: true,
            // auth: {authdb: "admin"},
        });
        this.db = mongoose.connection;
        this.db.on("error", logger.error.bind("Connection error"));

        RabbitmqProducer
            .getConnection(config.queue.connection)
            .then(connection => this.rabbitmqProducer = new RabbitmqProducer(connection))
            .catch(error => {
                logger.error(error);
                process.exit(1);
            });
    }

    public async upload(file: IFile): Promise<object> {
        if (!this.storage) {
            throw new Error("Storage is undefined");
        }
        try {
            const savedFile = await this.storage.put(file);

            const image = new ImageModel({
                name: savedFile.name,
                path: savedFile.path,
                storage: StorageTypes.FILE,
            });

            await image.save();
            return {image};
        } catch (e) {
            logger.error(e);
            return {e};
        }
    }

    public async notify(message: IMessageToUploadImages): Promise<boolean> {
        if (!this.rabbitmqProducer) {
            throw new Error("rabbitmqProducer is not initialised");
        }

        return this.rabbitmqProducer.sendMessageToQueue(this.queueName, message);
    }

}
