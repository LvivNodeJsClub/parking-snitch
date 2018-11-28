import { Connection, connect } from "amqplib";
import IQueueProducer from "./IQueueProducer";
import IMessageToUploadImages from "./IMessageToUploadImages";

export default class RabbitmqProducer implements IQueueProducer {
    constructor(private connection: Connection) {}

    async sendMessageToQueue(queue: string, message: IMessageToUploadImages): Promise<boolean> {
        const channel = await this.connection.createChannel();

        await channel.assertQueue(queue, {durable: true});

        return channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {persistent: true});
    }

    static async getConnection(url: string): Promise<Connection> {
        return connect(url);
    }
}
