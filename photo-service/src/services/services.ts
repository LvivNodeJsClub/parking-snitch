import MessageService from './messageService';
import PhotoService from './photoService';

export interface IServices {
	photoService: PhotoService;
	messageService: MessageService;
}
