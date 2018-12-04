import IMessageToUploadPhotos from "../queueConsumer/IMessageToUploadPhotos";
import ReportModel from "../models/reports";

export const photosMessageHandler = async (message: IMessageToUploadPhotos): Promise<void> => {
    await ReportModel.findOneAndUpdate({'_id': message.reportId}, {$push: {photoIds: message.photoIds}}, {new: true});
};
