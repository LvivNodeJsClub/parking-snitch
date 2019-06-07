import { Channel, connect, Connection } from 'amqplib';
import IMessageToUploadPhotos from './messageToUploadPhotos';
import IQueueProducer from './queueProducer';

export default class RabbitmqProducer implements IQueueProducer {
	private connection: Connection | undefined;
	private channel: Channel | undefined;
	private initialized: boolean = false;

	constructor(private url: string) {}

	public async init() {
		if (this.initialized) {
			throw new Error('The RabbitmqProducer instance is already initialised');
		}

		this.connection = await connect(this.url);
		this.channel = await this.connection.createChannel();
		this.initialized = true;
	}

	public async sendMessageToQueue(queue: string, message: IMessageToUploadPhotos): Promise<boolean> {
		if (!this.channel) {
			throw new Error('The RabbitmqProducer instance is not initialised yet');
		}

		await this.channel.assertQueue(queue, { durable: true });
		return this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
	}
}
