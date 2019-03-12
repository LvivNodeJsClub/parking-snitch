import mongoose, {Document, Model} from "mongoose";
import {StorageTypes} from "../storage/storageManager";

const {Schema} = mongoose;

export interface PhotoModel extends Document {
    _id: string
    name: string
    path: string
    type: string
    reportId: string
}

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

export const Photo: Model<PhotoModel> = mongoose.model<PhotoModel>('Photo', PhotoSchema);
