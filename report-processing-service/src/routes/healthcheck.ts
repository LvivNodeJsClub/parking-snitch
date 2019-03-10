import Router from 'koa-router';
import {healthcheck} from '../controllers/healthcheck';

const router = new Router();

router.get('/healthcheck', healthcheck);

export default router;
