import fs from "fs";
import {promisify} from "util";
import logger from "./logger";
import {IStorageAdapter} from "./storage";

const rename = promisify(fs.rename);

export default class FileAdapter implements IStorageAdapter {
    constructor(private source: string) {
    }

    public async save(oldPath: string, fileName: string): Promise<string> {
        const newPath = this.getNewPath(fileName);
        try {
            await rename(oldPath, newPath);
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
