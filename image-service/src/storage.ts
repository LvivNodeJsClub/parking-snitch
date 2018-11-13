export interface IStorageAdapter {
    save(path: string): string;
}

export default class StorageService {
    constructor(private adapter: IStorageAdapter) {
    }

    public put(path: string) {
        return this.adapter.save(path);
    }
}
