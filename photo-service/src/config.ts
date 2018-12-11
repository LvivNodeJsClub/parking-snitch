import {resolve} from "path";
import {StorageTypes} from "./storage/storageManager";

const config = {
    baseFilePath: resolve(__dirname, `../${process.env.FILE_PATH}`),
    defaultStorageType: (process.env.STORAGE_TYPE === "s3" ? StorageTypes.S3 : StorageTypes.FILE),
    db: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || "snitch",
        user: process.env.DB_USER || "user",
        password: process.env.DB_PASSWORD || "password",
        connection: "",
    },
    queue: {
        host: process.env.QUEUE_HOST || "localhost",
        port: process.env.QUEUE_PORT || 5672,
        imagesQueueName: process.env.IMAGES_QUEUE_NAME || "images_queue",
        connection: "",
    }
};

config.db.connection = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`;
config.queue.connection = `amqp://${config.queue.host}:${config.queue.port}`;
export default config;
