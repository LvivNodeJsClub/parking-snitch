import config from "../config";
import IMessageToUploadPhotos from "../queueProducer/IMessageToUploadPhotos";
import IQueueProducer from "../queueProducer/IQueueProducer";

export default class MessageService {
    constructor(private queueProducer: IQueueProducer) {}

    public async notify(message: IMessageToUploadPhotos): Promise<boolean> {
        return this.queueProducer.sendMessageToQueue(config.queue.imagesQueueName, message);
    }
}
