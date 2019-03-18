import config from './config';
import consumer from './queueConsumer/consumer';
import healthcheck from './routes/healthcheck';
import Koa from 'koa';
import {reportReadyHandler} from './handler/reportReady';


const app = new Koa();
app.use(healthcheck.routes());

consumer(config.reportReadyForProcessingQueue, reportReadyHandler);

export {app};
