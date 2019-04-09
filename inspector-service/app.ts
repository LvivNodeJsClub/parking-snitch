import express from 'express';
import bodyParser from "body-parser";
import router from './routes';
import {logErrors, handleError} from './errorHandler';

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

export {app};