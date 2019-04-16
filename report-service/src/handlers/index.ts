import IMessageToUploadPhotos from "../queueConsumer/IMessageToUploadPhotos";
import {Report} from "../models/reports";
import MessageService from "../service/messageService";

export function PhotosMessageHandler(messageService: MessageService) {
    return async (message: IMessageToUploadPhotos | null): Promise<void> => {
        if (message) {
            await Report.findOneAndUpdate({'_id': message.reportId}, {$push: {photoIds: message.photoIds}}, {new: true});

            await messageService.notify(message.reportId);
        }
    }
}
