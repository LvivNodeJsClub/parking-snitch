import Koa from 'koa';
import healthcheck from './routes/healthcheck';
import ReportReadyForProcessingMessageConsumer from "./queueConsumer/reportReadyForProcessingMessageConsumer";
import config from "./config";
import ReportReadyHandler from "./handlers/reportReadyHandler";
import {ReportClient} from "./services/reportClient";

const app = new Koa();
app.use(healthcheck.routes());

const reportClient = new ReportClient(config.reportBasePath);
const reportReadyHandler = new ReportReadyHandler(reportClient);

const consumer = new ReportReadyForProcessingMessageConsumer(config.reportReadyForProcessingQueue.connection);
consumer.init()
    .then(() => {
        return consumer.consumeMessagesFromQueue(config.reportReadyForProcessingQueue.queueName, reportReadyHandler.handler);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

export {app};
