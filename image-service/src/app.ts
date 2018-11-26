import {resolve} from "path";

import Storage from "./storage";

import FileAdapter from "./fileAdapter";

const filePath = resolve(__dirname, `..${process.env.FILE_PATH}`);
const fileAdapter = new FileAdapter(filePath);
export const storage = new Storage(fileAdapter);
