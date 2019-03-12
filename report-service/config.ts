
const config = {
    reportReadyForProcessingQueue: {
        host: process.env.QUEUE_HOST || "localhost",
        port: process.env.QUEUE_PORT || 5672,
        queueName: process.env.IMAGES_QUEUE_NAME || "report_ready_for_processing_queue",
        connection: "",
    }
};

config.reportReadyForProcessingQueue.connection = `amqp://${config.reportReadyForProcessingQueue.host}:${config.reportReadyForProcessingQueue.port}`;
export default config;
