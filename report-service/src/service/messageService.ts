import IQueueProducer from "../queueProducer/IQueueProducer";

export default class MessageService {
    constructor(private rabbitmqProducer: IQueueProducer, private queueName: string) {}

    public async notify(reportId: string): Promise<boolean> {
        return this.rabbitmqProducer.sendMessageToQueue(this.queueName, reportId);
    }
}
