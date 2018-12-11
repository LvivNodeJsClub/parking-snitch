import IMessageToUploadPhotos from "../queueConsumer/IMessageToUploadPhotos";
import ReportModel from "../models/reports";

export const photosMessageHandler = async (message: IMessageToUploadPhotos | null): Promise<void> => {
    if (message) {
        await ReportModel.findOneAndUpdate({'_id': message.reportId}, {$push: {photoIds: message.photoIds}}, {new: true});
    }
};
