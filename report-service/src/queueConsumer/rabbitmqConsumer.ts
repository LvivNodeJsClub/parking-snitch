import {Connection, ConsumeMessage, Message, Channel, connect} from "amqplib";
import IQueueConsumer from "./IQueueConsumer";
import IMessageToUploadPhotos from "./IMessageToUploadPhotos";

export default class RabbitmqConsumer implements IQueueConsumer {
    private connection: Connection | undefined;
    private channel: Channel | undefined;
    private initialized: boolean = false;

    constructor(private url: string) {}

    async init() {
        if (this.initialized) {
            throw new Error("The RabbitmqConsumer instance already initialised");
        }

        this.connection = await connect(this.url);
        this.channel = await this.connection.createChannel();
        this.initialized = true;
    }

    async consumeMessagesFromQueue(queue: string, onMessage: (msg: IMessageToUploadPhotos | null) => Promise<void>): Promise<void> {
        if (!this.channel) {
            throw new Error("The RabbitmqConsumer instance is not initialised yet");
        }

        await this.channel.assertQueue(queue, {durable: true});
        await this.channel.prefetch(1);
        await this.channel.consume(queue, async (message: ConsumeMessage | null) => {
            const messageToUploadPhotos = message && JSON.parse(message.content.toString()) as IMessageToUploadPhotos;

            await onMessage(messageToUploadPhotos as IMessageToUploadPhotos);
            this.channel && this.channel.ack(message as Message);
        }, {noAck: false});
    }
}
