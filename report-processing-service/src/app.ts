import Koa from 'koa';
import healthcheck from './routes/healthcheck';
import ReportReadyForProcessingMessageConsumer from "./queueConsumer/reportReadyForProcessingMessageConsumer";
import config from "./config";
import {reportReadyHandler} from "./handlers/reportReadyHandler";

const app = new Koa();
app.use(healthcheck.routes());

const consumer = new ReportReadyForProcessingMessageConsumer(config.reportReadyForProcessingQueue.connection);
consumer.init()
    .then(() => {
        return consumer.consumeMessagesFromQueue(config.reportReadyForProcessingQueue.queueName, reportReadyHandler);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

export {app};
