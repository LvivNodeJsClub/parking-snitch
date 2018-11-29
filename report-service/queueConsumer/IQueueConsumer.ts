import IMessageToUploadImages from "./IMessageToUploadImages";

export default interface IQueueConsumer {
    consumeMessagesFromQueue(queue: string, onMessage: (msg: IMessageToUploadImages) => Promise<void>): Promise<void>;
}
