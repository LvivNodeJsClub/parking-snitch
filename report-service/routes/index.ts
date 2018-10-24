import Router from 'koa-router';

import reportsRouter from './reports';

const router = new Router();

router.use('/reports', reportsRouter.routes(), reportsRouter.allowedMethods());

export default router;