import IMessageToUploadPhotos from "./IMessageToUploadPhotos";

export default interface IQueueProducer {
    init(): Promise<void>;
    sendMessageToQueue(queue: string, message: IMessageToUploadPhotos): Promise<boolean>;
}
