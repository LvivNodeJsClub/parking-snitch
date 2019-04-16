import app from './app';
import config from './config';
import InspectorClient from './services/inspectorClient';
import NotificationClient from './services/notificationClient';
import ReportClient from './services/reportClient';
import ReportReadyForProcessingMessageConsumer from './queueConsumer/reportReadyForProcessingMessageConsumer';
import ReportReadyHandler from './handlers/reportReadyHandler';

const reportClient = new ReportClient(config.reportBasePath);
const inspectorClient = new InspectorClient(config.inspectorBasePath);
const notificationClient = new NotificationClient(config.notificationBasePath);
const reportReadyHandler = new ReportReadyHandler(reportClient, inspectorClient, notificationClient);

const consumer = new ReportReadyForProcessingMessageConsumer(config.reportReadyForProcessingQueue.connection);

export default async () => {
  await consumer.init();
  const queueName = config.reportReadyForProcessingQueue.queueName;
  await consumer.consumeMessagesFromQueue(queueName, reportReadyHandler.handler);
  return app;
};
