const {
    PORT = 3000,
    // mongo
    DB_HOST = '127.0.0.1',
    DB_PORT = 27017,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,

    // output queue
    REPORT_QUEUE_HOST = '127.0.0.1',
    REPORT_QUEUE_PORT = 5672,
    REPORT_QUEUE_NAME = 'report_ready_for_processing_queue',

    // input queue
    QUEUE_HOST = '127.0.0.1',
    QUEUE_PORT = 5672,
    IMAGES_QUEUE_NAME = ''
} = process.env;

const config = {
    listenPort: PORT,
    monogo: {
        connection: `mongodb://${DB_HOST}:${DB_PORT}/`,
        options: {
            useNewUrlParser: true,
            user: DB_USER,
            pass: DB_PASSWORD,
            dbName: DB_NAME,
        }
    },
    reportReadyForProcessingQueue: {
        queueName: REPORT_QUEUE_NAME,
        connection: `amqp://${REPORT_QUEUE_HOST}:${REPORT_QUEUE_PORT}`,
    },
    reportImagesQueue: {
        queueName: IMAGES_QUEUE_NAME,
        connection: `amqp://${QUEUE_HOST}:${QUEUE_PORT}/`,
    }
};

export default config;
