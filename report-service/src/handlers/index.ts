import IMessageToUploadPhotos from "../queueConsumer/IMessageToUploadPhotos";
import ReportModel from "../models/reports";
import MessageService from "../service/messageService";

export function PhotosMessageHandler(messageService: MessageService) {
    return async (message: IMessageToUploadPhotos | null): Promise<void> => {
        if (message) {
            await ReportModel.findOneAndUpdate({'_id': message.reportId}, {$push: {photoIds: message.photoIds}}, {new: true}).exec();

            await messageService.notify(message.reportId);
        }
    }
}
