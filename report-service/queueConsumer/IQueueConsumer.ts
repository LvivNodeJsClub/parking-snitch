import IMessageToUploadPhotos from "./IMessageToUploadPhotos";

export default interface IQueueConsumer {
    init(): Promise<void>;
    consumeMessagesFromQueue(queue: string, onMessage: (msg: IMessageToUploadPhotos | null) => Promise<void>): Promise<void>;
}
