
const config = {
    reportReadyForProcessingQueue: {
        host: process.env.REPORT_QUEUE_HOST || "localhost",
        port: process.env.REPORT_QUEUE_PORT || 5672,
        queueName: process.env.REPORT_QUEUE_NAME || "report_ready_for_processing_queue",
        connection: "",
    }
};

config.reportReadyForProcessingQueue.connection = `amqp://${config.reportReadyForProcessingQueue.host}:${config.reportReadyForProcessingQueue.port}`;
export default config;
