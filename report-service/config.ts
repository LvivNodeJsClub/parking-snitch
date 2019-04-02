
const config = {
    reportReadyForProcessingQueue: {
        host: process.env.REPORT_QUEUE_HOST || "127.0.0.1",
        port: process.env.REPORT_QUEUE_PORT || 5672,
        queueName: process.env.REPORT_QUEUE_NAME || "report_ready_for_processing_queue",
        connection: "",
    },
    reportImagesQueue: {
        host: process.env.QUEUE_HOST || "127.0.0.1",
        port: process.env.QUEUE_PORT || 5672,
        queueName: process.env.IMAGES_QUEUE_NAME || '',
        connection: '',
    }
};
config.reportImagesQueue.connection = `amqp://${config.reportImagesQueue.host}:${config.reportImagesQueue.port}/`;
config.reportReadyForProcessingQueue.connection = `amqp://${config.reportReadyForProcessingQueue.host}:${config.reportReadyForProcessingQueue.port}`;
export default config;
