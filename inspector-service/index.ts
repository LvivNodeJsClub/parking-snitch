import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import router from './routes';
import {logErrors, handleError} from './errorHandler';

const {PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

const DB_PORT = process.env.DB_PORT || 27017;

init().then(() => {
    // init express application
    const app = express();

    // middleware
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // routes
    app.use(router);

    // error handlers
    app.use(logErrors);
    app.use(handleError);

    // start server
    app.listen(PORT, () => console.log(`Service is up and running on port ${PORT}`));
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
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
