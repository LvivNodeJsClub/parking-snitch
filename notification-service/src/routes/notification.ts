import Router from 'koa-router';
import {notify, notifications} from '../controllers/notification';

const router = new Router();

router.post('/notify', notify);
router.get('/notifications', notifications);

export default router;
