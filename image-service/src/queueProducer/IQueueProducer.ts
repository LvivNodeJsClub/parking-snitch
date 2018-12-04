import IMessageToUploadImages from "./IMessageToUploadImages";

export default interface IQueueProducer {
    sendMessageToQueue(queue: string, message: IMessageToUploadImages): Promise<boolean>;
}
