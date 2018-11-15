import Storage from "./storage";

import FileAdapter from "./fileAdapter";

const filePath = `${__dirname}/..${process.env.FILE_PATH}`;
const fileAdapter = new FileAdapter(filePath);
export const storage = new Storage(fileAdapter);
