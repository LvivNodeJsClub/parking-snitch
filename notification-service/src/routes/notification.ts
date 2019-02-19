import Router from 'koa-router';
import {notify} from '../controllers/notification';

const router = new Router();

router.post('/notify', notify);

export default router;
