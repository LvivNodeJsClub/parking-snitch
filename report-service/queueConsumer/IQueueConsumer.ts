import IMessageToUploadPhotos from "./IMessageToUploadPhotos";

export default interface IQueueConsumer {
    init(): Promise<void>;
    consumeMessagesFromQueue(queue: string, onMessage: (msg: IMessageToUploadPhotos) => Promise<void>): Promise<void>;
}
