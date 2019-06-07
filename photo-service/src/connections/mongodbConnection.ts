import mongoose, { Connection } from 'mongoose';
import config from '../config';
import IDbConnection from './dbConnection';

export default class MongodbConnection implements IDbConnection {
	private initialized: boolean = false;
	private connection: Connection = mongoose.connection;

	public async init() {
		if (this.initialized) {
			throw new Error('The MongodbConnection instance is already initialised');
		}

		await mongoose.connect(config.db.connection, {
			useNewUrlParser: true,
			user: config.db.user,
			pass: config.db.password,
			dbName: config.db.name,
		});
	}
}
