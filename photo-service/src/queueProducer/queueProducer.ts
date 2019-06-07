import IMessageToUploadPhotos from './messageToUploadPhotos';

export default interface IQueueProducer {
	init(): Promise<void>;
	sendMessageToQueue(queue: string, message: IMessageToUploadPhotos): Promise<boolean>;
}
