import crypto from 'crypto';

export interface ISavedFile {
	name: string;
	path: string;
}

export interface IStorageAdapter {
	save(oldPath: string, fileName: string): Promise<ISavedFile>;
	get(name: string): Promise<File>;
}

export interface IFile {
	name: string;
	type: string;
	path: string;
}

export default class StorageService {
	constructor(private adapter: IStorageAdapter) {}

	public async put(file: IFile): Promise<ISavedFile> {
		if (!file.type.startsWith('image/')) {
			throw new Error(`Invalid file type! Expected: 'image/*', got '${file.type}'`);
		}
		return this.adapter.save(file.path, this.encodeFilename(file.name));
	}

	public async get(file: IFile) {
		return this.adapter.get(file.name);
	}

	public encodeFilename(fileName: string): string {
		const [name, extension] = fileName.split('.');
		return (
			crypto
				.createHash('md5')
				.update(name + Date.now())
				.digest('hex') +
			'.' +
			extension
		);
	}
}
