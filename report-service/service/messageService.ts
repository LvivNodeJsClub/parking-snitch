import config from "../config";
import logger from "../logger";
import IQueueProducer from "../queueProducer/IQueueProducer";
import RabbitmqProducer from "../queueProducer/rabbitmqProducer";

export default class MessageService {
    private readonly rabbitmqProducer: IQueueProducer;

    constructor() {
        this.rabbitmqProducer = new RabbitmqProducer(config.reportReadyForProcessingQueue.connection);
        this.rabbitmqProducer.init().catch(error => {
            logger.error(error);
            process.exit(1);
        });
    }

    public async notify(reportId: string): Promise<boolean> {
        return this.rabbitmqProducer.sendMessageToQueue(config.reportReadyForProcessingQueue.queueName, reportId);
    }
}
