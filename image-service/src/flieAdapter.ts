import fs from "fs";
import { IStorageAdapter} from "./storage";

export default class FileAdapter implements IStorageAdapter {
    constructor(private source: string) {
    }
    public save(path: string): string {
        // fs.readFile(path)
        // fs.writeFile(path,);
        return "";
    }
}
