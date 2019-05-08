import express from 'express';
import bodyParser from "body-parser";
import {RegisterRoutes} from './routes/routes';
import {logErrors, handleError} from './errorHandler';
import * as swaggerUI from 'swagger-ui-express';

import './controllers/inspectors';
import './controllers/healthcheck';

// init express application
const app = express();

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
RegisterRoutes(app);

try{
    const swaggerDoc = require('./swagger.json');
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
} catch (e) {
    console.error(e);
}

// error handlers
app.use(logErrors);
app.use(handleError);

export {app};