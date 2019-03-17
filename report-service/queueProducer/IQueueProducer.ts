
export default interface IQueueProducer {
    init(): Promise<void>;
    sendMessageToQueue(queue: string, reportId: string): Promise<boolean>;
}
