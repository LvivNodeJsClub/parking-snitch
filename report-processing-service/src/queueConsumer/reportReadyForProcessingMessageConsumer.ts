import ReportReadyForProcessingMessage from './reportReadyForProcessingMessage';
import {Channel, connect, Connection, ConsumeMessage, Message} from 'amqplib';

export default class ReportReadyForProcessingMessageConsumer {
    private connection: Connection | undefined;
    private channel: Channel | undefined;
    private initialized: boolean = false;

    constructor(private url: string) {
    }

    public async init() {
        if (this.initialized) {
            throw new Error('The ReportReadyForProcessingMessageConsumer instance already initialised');
        }

        this.connection = await connect(this.url);
        this.channel = await this.connection.createChannel();
        this.initialized = true;
    }

    public async consumeMessagesFromQueue(queue: string, onMessage: (reportId: string) => Promise<void>) {
        if (!this.channel) {
            throw new Error('The ReportReadyForProcessingMessageConsumer instance is not initialised yet');
        }

        await this.channel.assertQueue(queue, {durable: true});
        await this.channel.prefetch(1);
        await this.channel.consume(queue, async (message: ConsumeMessage | null) => {
            const messageToUploadPhotos = (message && JSON.parse(message.content.toString())) as
                ReportReadyForProcessingMessage;

            await onMessage(messageToUploadPhotos.reportId);
            if (this.channel) {
                this.channel.ack(message as Message);
            }
        }, {noAck: false});
    }
}
