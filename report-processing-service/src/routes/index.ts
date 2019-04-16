import Router from 'koa-router';
import { RegisterRoutes } from './routes';

const router = new Router();

RegisterRoutes(router);

export default router;
