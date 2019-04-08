import {Router} from 'express';
import inspectorsRouter from './inspectors';
import healthCheck from './healthcheck';

const router = Router();

router.use('/inspectors', inspectorsRouter);
router.use('/', healthCheck);

export default router;