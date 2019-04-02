import mongoose, {Connection} from "mongoose";
import config from "../config";
import IDBConnection from "./IDBConnection";

export default class MongodbConnection implements IDBConnection {
    private initialized: boolean = false;
    private connection: Connection = mongoose.connection;

    async init() {
        if (this.initialized) {
            throw new Error("The MongodbConnection instance is already initialised");
        }

        await mongoose.connect(config.db.connection, {
            useNewUrlParser: true,
            user: config.db.user,
            pass: config.db.password,
            dbName: config.db.name,
        });
    }
}
