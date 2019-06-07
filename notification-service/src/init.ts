import mongoose from "mongoose";
import logger from "./logger";

const {DB_PORT = 27017, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

export async function init() {
    try {
        await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/`, {
            useNewUrlParser: true,
            user: DB_USER,
            pass: DB_PASSWORD,
            dbName: DB_NAME,
        })
    } catch (error) {
        logger.log(error);
        process.exit(1);
    }
}
