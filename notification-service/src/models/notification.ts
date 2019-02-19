import mongoose, {Document, Model} from "mongoose";

const {Schema} = mongoose;

export interface NotificationModel extends Document {
    _id: string
    inspectorId: string
    reportId: string
}

const notificationSchema = new Schema({
    inspectorId: Schema.Types.String,
    reportId: Schema.Types.String
});

export const Notification: Model<NotificationModel> = mongoose.model<NotificationModel>('Notification', notificationSchema);