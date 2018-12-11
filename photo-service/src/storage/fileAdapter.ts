import fs from "fs";
import {resolve, sep as DS} from "path";
import mkdirp from "mkdirp";
import {promisify} from "util";
import logger from "../logger";
import {ISavedFile, IStorageAdapter} from "./storage";

const rename = promisify(fs.rename);
const mkdir = promisify(mkdirp);

export default class FileAdapter implements IStorageAdapter {
    constructor(private basePath: string) {
    }

    public async save(tmpPath: string, fileName: string): Promise<ISavedFile> {
        const relativePath = this.getRelativePath(fileName);
        const dirPath = resolve(this.basePath, this.getDir());
        try {
            await mkdir(dirPath);
            await rename(tmpPath, resolve(this.basePath, relativePath));
        } catch (e) {
            logger.error("Error while moving file", tmpPath, relativePath, e);
            throw e;
        }
        return {
            name: fileName,
            path: relativePath,
        };
    }

    public async get(name: string): Promise<File> {
        return new File([], name);
    }

    private getDir(): string {
        return  new Date().toISOString().substring(0, 10); // using YYYY-MM-DD as a directory
    }

    private getRelativePath(fileName: string): string {
        return [this.getDir(), fileName].join(DS);
    }
}
