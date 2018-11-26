import mongoose, {Connection} from "mongoose";
import config from "./config";
import logger from "./logger";
import ImageModel from "./models/image";
import StorageService, {IFile} from "./storage/storage";
import StorageManager, {StorageTypes} from "./storage/storageManager";

export default class App {
    private readonly storage: StorageService | undefined;
    private db: Connection;
    constructor(storageType: StorageTypes) {
        this.storage = StorageManager.getStorage(storageType);
        mongoose.connect(config.db.connection, {
            useNewUrlParser: true,
            auth: {authdb: "admin"},
        });
        this.db = mongoose.connection;
        this.db.on("error", logger.error.bind("Connection error"));
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

}
