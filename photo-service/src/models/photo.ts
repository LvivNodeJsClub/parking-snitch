import {model, Schema} from "mongoose";
import {StorageTypes} from "../storage/storageManager";

const PhotoSchema = new Schema({
    name: String,
    path: String,
    storage: {
        default: StorageTypes.FILE,
        enum: Object.values(StorageTypes),
        type: String,
    },
    type: String,
    reportId: String,
}, {timestamps: true});

const PhotoModel = model("Photo", PhotoSchema);

export default PhotoModel;
