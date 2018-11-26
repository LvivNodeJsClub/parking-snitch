import {ISavedFile, IStorageAdapter} from "./storage";

export default class S3Adapter implements IStorageAdapter {

    public async get(name: string): Promise<File> {
        return new File([], name);
    }

    public async save(oldPath: string, fileName: string): Promise<ISavedFile> {
        // TODO implement cloud storage upload
        return {
            name: fileName,
            path: fileName,
        };
    }
}
