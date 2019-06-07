import Router from 'koa-router';
import '../controllers/reports';
import '../controllers/healthcheck';
import { RegisterRoutes } from "./routes";

const router = new Router();

RegisterRoutes(router);

export default router;
