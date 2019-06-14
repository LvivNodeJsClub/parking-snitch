import express, {Request, Response, NextFunction} from 'express';
import bodyParser from "body-parser";
import router from './routes';
import {logErrors, handleError} from './errorHandler';

// init express application
const app = express();


// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
app.use(router);

// error handlers
app.use(logErrors);
app.use(handleError);

export {app};
