import {model, Schema} from "mongoose";
import {StorageTypes} from "../storage/storageManager";

const ImageSchema = new Schema({
    name: String,
    path: String,
    storage: {
        default: StorageTypes.FILE,
        enum: Object.values(StorageTypes),
        type: String,
    },
    type: String,
}, {timestamps: true});

const ImageModel = model("Image", ImageSchema);

export default ImageModel;
