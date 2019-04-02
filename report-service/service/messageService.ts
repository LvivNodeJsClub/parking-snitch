import config from "../config";
import logger from "../logger";
import IQueueProducer from "../queueProducer/IQueueProducer";

export default class MessageService {
    constructor(private rabbitmqProducer: IQueueProducer) {}

    public async notify(reportId: string): Promise<boolean> {
        return this.rabbitmqProducer.sendMessageToQueue(config.reportReadyForProcessingQueue.queueName, reportId);
    }
}
