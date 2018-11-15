import fs from "fs";
import logger from "./logger";
import {IStorageAdapter} from "./storage";

export default class FileAdapter implements IStorageAdapter {
    constructor(private source: string) {
    }

    public async save(oldPath: string, fileName: string): Promise<string> {
        const newPath = this.getNewPath(fileName);
        try {
            // @ts-ignore
            await fs.rename(oldPath, newPath, (e) => {
                if (e) { throw e; }
            });
        } catch (e) {
            logger.error("Error while moving file", oldPath, newPath, e);
            throw e;
        }
        return newPath;
    }

    private getNewPath(fileName: string): string {
        return `${this.source}/${fileName}`;
    }
}
