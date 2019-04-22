import config from '../config';
import IMessageToUploadPhotos from '../queueProducer/messageToUploadPhotos';
import IQueueProducer from '../queueProducer/queueProducer';

export default class MessageService {
	constructor(private queueProducer: IQueueProducer) {}

	public async notify(message: IMessageToUploadPhotos): Promise<boolean> {
		return this.queueProducer.sendMessageToQueue(config.queue.imagesQueueName, message);
	}
}
