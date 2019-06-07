import config from './config';
import MongodbConnection from './connections/mongodbConnection';
import RabbitmqProducer from './queueProducer/rabbitmqProducer';
import MessageService from './services/messageService';
import PhotoService from './services/photoService';
import { StorageTypes } from './storage/storageManager';

const rabbitmqProducer = new RabbitmqProducer(config.queue.connection);
const mongoDbConnection = new MongodbConnection();

export default () =>
	Promise.all([rabbitmqProducer.init(), mongoDbConnection.init()]).then(() => ({
		messageService: new MessageService(rabbitmqProducer),
		photoService: new PhotoService(StorageTypes.FILE),
	}));
