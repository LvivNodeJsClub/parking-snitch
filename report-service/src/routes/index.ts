import Router from 'koa-router';

import reportsRouter from './reports';
import healthcheck from './healthcheck';

const router = new Router();

router.use(healthcheck.routes())
router.use('/reports', reportsRouter.routes(), reportsRouter.allowedMethods());

export default router;
