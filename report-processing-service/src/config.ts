
const config = {
  baseUrl: process.env.SERVICE_BASE_URL || 'http://localhost:3000',
  port: process.env.PORT || 3000,
  inspectorBasePath: process.env.INSPECTOR_BASE_PATH || 'http://localhost:3003',
  notificationBasePath: process.env.NOTIFICATION_BASE_PATH || 'http://localhost:3004',
  reportBasePath: process.env.REPORT_BASE_PATH || 'http://localhost:3001',
  reportReadyForProcessingQueue: {
    connection: '',
    host: process.env.REPORT_QUEUE_HOST || 'localhost',
    port: process.env.REPORT_QUEUE_PORT || 5672,
    queueName: process.env.REPORT_QUEUE_NAME || 'report_ready_for_processing_queue',
  },
};

config.reportReadyForProcessingQueue.connection =
    `amqp://${config.reportReadyForProcessingQueue.host}:${config.reportReadyForProcessingQueue.port}`;

export default config;
