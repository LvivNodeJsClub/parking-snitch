import logger from '../logger';
import { Photo as PhotoModel } from '../models/photo';
import StorageService, { IFile } from '../storage/storage';
import StorageManager, { StorageTypes } from '../storage/storageManager';

export default class PhotoService {
	private readonly storage: StorageService | undefined;

	constructor(private storageType: StorageTypes) {
		this.storage = StorageManager.getStorage(storageType);
	}

	public async upload(file: IFile, reportId: string): Promise<object> {
		if (!this.storage) {
			throw new Error('Storage is undefined');
		}
		try {
			const savedFile = await this.storage.put(file);

			const photo = new PhotoModel({
				name: savedFile.name,
				path: savedFile.path,
				storage: StorageTypes.FILE,
				reportId,
			});

			await photo.save();
			return { photo };
		} catch (e) {
			logger.error(e);
			return { e };
		}
	}
}
