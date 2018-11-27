import {InvalidArgumentError} from "restify-errors";
import config from "../config";
import FileAdapter from "./fileAdapter";
import S3Adapter from "./s3Adapter";
import StorageService from "./storage";

export enum StorageTypes {
    FILE = "file",
    S3 = "s3",
}

export default class StorageManager {

    public static storages = new Map<string, StorageService>();

    public static getStorage(type: StorageTypes): StorageService | undefined {
        const storage = this.storages.get(type);
        if (!storage) {
            this.storages.set(type, this.createStorageByType(type));
        }

        return this.storages.get(type);
    }

    private static createStorageByType(type: StorageTypes): StorageService {
        if (type === StorageTypes.FILE) {
            return new StorageService(new FileAdapter(config.baseFilePath));
        } else if (type === StorageTypes.S3) {
            return new StorageService(new S3Adapter());
        } else {
            throw new InvalidArgumentError("Unsupported storage type: %S", type);
        }
    }
}
