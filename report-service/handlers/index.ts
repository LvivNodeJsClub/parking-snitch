import IMessageToUploadImages from "../queueConsumer/IMessageToUploadImages";

export const imagesMessageHandler = async (message: IMessageToUploadImages): Promise<void> => {
    console.log(message);
    //TODO: add images to report
};
