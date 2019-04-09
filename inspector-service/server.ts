import mongoose from 'mongoose';
import {app} from './app';

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

const DB_PORT = process.env.DB_PORT || 27017;

async function init() {
    await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/`, {
        useNewUrlParser: true,
        user: DB_USER,
        pass: DB_PASSWORD,
        dbName: DB_NAME,
    });
    console.log('Database connection successful');
}

export default init().then(() => {
    return app;
});