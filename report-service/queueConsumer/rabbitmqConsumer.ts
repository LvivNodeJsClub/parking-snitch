import {Connection, connect, ConsumeMessage, Message} from "amqplib";
import IQueueConsumer from "./IQueueConsumer";
import IMessageToUploadImages from "./IMessageToUploadImages";

export default class RabbitmqConsumer implements IQueueConsumer {
    constructor(private connection: Connection) {}

    async consumeMessagesFromQueue(queue: string, onMessage: (msg: IMessageToUploadImages) => Promise<void>): Promise<void> {
        const channel = await this.connection.createChannel();

        await channel.assertQueue(queue, {durable: true});
        await channel.prefetch(1);
        await channel.consume(queue, async (message: ConsumeMessage | null) => {
            const messageToUploadImages = message && JSON.parse(message.content.toString());

            await onMessage(messageToUploadImages as any as IMessageToUploadImages);
            channel.ack(message as Message);
        }, {noAck: false});
    }

    static async getConnection(url: string): Promise<Connection> {
        return connect(url);
    }
};
